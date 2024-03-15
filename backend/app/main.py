from fastapi import FastAPI, UploadFile, File, APIRouter,  HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from app.db_setup import init_db, get_db
from contextlib import asynccontextmanager
from fastapi import Request
from fastapi.responses import FileResponse
from uuid import uuid4
import os

from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update, delete, insert
from app.database.models import TravelUser, Experience, ImageLink
from app.schemas import TravelUserSchema, ExperienceSchema, ExperienceUpdateSchema, ImageLinkSchema
from app.prompting import handle_call

from app.exceptions import MaxTokenReachedException

import app.database.crud as crud


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

origins = [
    "https://localhost",
    "https://localhost:8000",
    "https://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user_router = APIRouter()
experience_router = APIRouter()
image_router = APIRouter()
# Works with local directory eg. C:/User/{username}/Pictures/test/
IMAGEDIR = "E:/test/"


# @user_router.post("/", status_code=201)
# def create_user(user: TravelUserSchema, db: Session = Depends(get_db)):
#     try:
#         db_user = TravelUser(**user.model_dump())
#         db.add(db_user)
#         db.commit()
#     except IntegrityError:
#         raise HTTPException(status_code=400, detail="Could not add user")
#     return db_user


############################################################
# Users
############################################################

@user_router.post("/", status_code=201)
def create_user(user: TravelUserSchema, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_username(db=db, username=user.username)
        if db_user:
            raise HTTPException(
                status_code=400, detail="Username already exists.")
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Could not add user.")
    return crud.create_user(db=db, user=user)


@user_router.get("/{user_id}", status_code=200)
def get_user(user_id: int, db: Session = Depends(get_db)) -> TravelUserSchema:
    db_user = crud.get_user(db=db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found!")
    return db_user


@user_router.get("/", status_code=200)
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[TravelUserSchema]:
    users = crud.get_users(db=db, skip=skip, limit=limit)
    return users


############################################################
# Experiences
############################################################

@experience_router.post("/", status_code=201)
def create_experience(experience: ExperienceSchema, db: Session = Depends(get_db)):
    try:
        db_experience = crud.create_experience(db=db, experience=experience)
        return db_experience
    except IntegrityError:
        raise HTTPException(
            status_code=400, detail="Could not add experience.")


@experience_router.get("/{experience_id}", status_code=200)
def get_experience(experience_id: id, db: Session = Depends(get_db)) -> ExperienceSchema:
    db_experience = crud.get_experience(db=db, experience_id=experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found!")
    return db_experience

#################################################################
# @experience_router.patch("/{title}", status_code=200)
# @app.patch("/experience/{title}", status_code=200)
# def update_experience(title: str, updated_experience: ExperienceUpdateSchema, db: Session = Depends(get_db)) -> ExperienceSchema:
#     try:
#         # Check if the experience exists
#         db_experience = db.query(Experience).filter(
#             Experience.title == title).first()
#         db_experience = db.query(Experience).filter(
#             Experience.title == title).first()
#         if not db_experience:
#             raise HTTPException(
#                 status_code=404, detail="Experience not found!")
#         # Update only the specified fields
#         for field, value in updated_experience.dict(exclude_unset=True).items():
#             setattr(db_experience, field, value)
#         db.commit()
#         return db_experience
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(status_code=500, detail=str(e))
######################################################################

############################################################
# Images
############################################################


@image_router.post("/", status_code=201)
async def upload_image(files: list[UploadFile] = File(...), db: Session = Depends(get_db)):
    accepted_img_extensions = ['jpg', 'jpeg', 'bmp', 'webp', 'png']
    try:
        for file in files:
            filename = file.filename
            filename_splitted = filename.split(".")
            file_extension = filename_splitted[-1]
            if file_extension not in accepted_img_extensions:
                raise HTTPException(
                    status_code=400, detail="Image extension is not supported")
            new_img_name = uuid4()
            file.filename = f"{new_img_name}.{file_extension}"
            contents = await file.read()
            with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
                f.write(contents)

    # Uploads to database -> Probably want to move this to experience
        for i, file in enumerate(files):
            print(f"Test: {file.filename}")
            db_file = ImageLinkSchema(image_link=file.filename, order=i)
            db_image_link = ImageLink(**db_file.model_dump())
            db.add(db_image_link)
            db.commit()
    except Exception as e:
        # return {"message": "There was an error uploading the file(s)",
        #         "error": e}
        raise e
    return {"uploaded_image(s): ": [file.filename for file in files]}


@image_router.get("/{image_name}", status_code=200)
def get_image(image_name: str):
    # images = os.listdir(IMAGEDIR)
    return FileResponse(f"{IMAGEDIR}{image_name}")


app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(experience_router, prefix="/experience",
                   tags=["experience"])
app.include_router(image_router, prefix="/images", tags=["images"])


@app.get("/location", status_code=200)
def get_location(search_prompt: str):
    try:
        return handle_call(input=search_prompt)
    except MaxTokenReachedException:
        raise HTTPException(
            status_code=400, detail="Please enter less number of characters.")
