from fastapi import FastAPI, UploadFile, File, APIRouter,  HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from app.db_setup import init_db, get_db
from contextlib import asynccontextmanager
from fastapi import Request
from fastapi.responses import FileResponse
from uuid import uuid4
import os

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update, delete, insert
from app.database.models import TravelUser, Experience, ImageLink
from app.schemas import TravelUserSchema, ExperienceSchema, ExperienceUpdateSchema, ImageLinkSchema
from app.prompting import call_for_location
from app.auth_endpoints import router as auth_router

from app.exceptions import MaxTokenReachedException

import app.database.crud as crud


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

user_router = APIRouter()
experience_router = APIRouter()
image_router = APIRouter()


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


app.include_router(user_router, prefix="/user", tags=["user"])

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
def get_experience(experience_id: int, db: Session = Depends(get_db)) -> ExperienceSchema:
    db_experience = crud.get_experience(db=db, experience_id=experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found!")
    return db_experience


@experience_router.patch("/{experience_id}", status_code=200)
def update_experience(experience_id: int, updated_experience: ExperienceUpdateSchema, db: Session = Depends(get_db)) -> ExperienceSchema:
    db_experience = crud.get_experience(db=db, experience_id=experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found!")
    try:
        db_experience = crud.update_experience(
            db=db, db_experience=db_experience, updated_experience=updated_experience)
        return db_experience
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


app.include_router(experience_router, prefix="/experience",
                   tags=["experience"])

############################################################
# Images
############################################################

# Works with local directory eg. C:/User/{username}/Pictures/test/
IMAGEDIR = "E:/test/"


@image_router.post("/", status_code=201)
async def upload_image(file: UploadFile):
    print(file.size)
    if file.size > 1000000:
        raise HTTPException(status_code=413, detail="Size of image to large")
    accepted_img_extensions = ['jpg', 'jpeg', 'bmp', 'webp', 'png']
    filename = file.filename
    filename_splitted = filename.split(".")
    file_extension = filename_splitted[-1]
    if file_extension not in accepted_img_extensions:
        raise HTTPException(
            status_code=415, detail="Image extension is not supported")
    new_img_name = uuid4()
    file.filename = f"{new_img_name}.{file_extension}"
    contents = await file.read()
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
    return {"filename": file.filename}


@image_router.delete("/", status_code=200)
async def delete_image(filename: str):
    if os.path.exists(f"{IMAGEDIR}{filename}"):
        os.remove(f"{IMAGEDIR}{filename}")
        return {"file deleted": filename}
    raise HTTPException(status_code=404, detail=f"{filename} not found")


@image_router.get("/{image_name}", status_code=200)
def get_image(image_name: str):
    return FileResponse(f"{IMAGEDIR}{image_name}")


app.include_router(image_router, prefix="/image", tags=["image"])


@app.get("/location", status_code=200)
def get_location(search_prompt: str):
    try:
        return call_for_location(input=search_prompt)
    except MaxTokenReachedException:
        raise HTTPException(
            status_code=400, detail="Please enter less number of characters.")
