from fastapi import FastAPI, UploadFile, APIRouter,  HTTPException, Depends, status
from app.db_setup import init_db, get_db
from contextlib import asynccontextmanager
from fastapi import Request
from fastapi.responses import FileResponse
from uuid import uuid4
import os

from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update, delete, insert
from app.database.models import TravelUser
from app.database.models import Experience
from app.schemas import TravelUserSchema
from app.schemas import ExperienceSchema
from app.schemas import ExperienceUpdateSchema


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)
router = APIRouter()
IMAGEDIR = "images/"


@app.post("/user", status_code=201)
def create_user(user: TravelUserSchema, db: Session = Depends(get_db)):
    try:
        db_user = TravelUser(**user.model_dump())
        db.add(db_user)
        db.commit()
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Could not add user")
    return db_user


@app.get("/user/{username}", status_code=200)
def get_user(username: str, db: Session = Depends(get_db)) -> TravelUserSchema:
    try:
        db_user = db.scalars(select(TravelUser).where(
            TravelUser.username == username)).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found!")

        return db_user

    except Exception as e:
        raise e


@app.get("/user/{username}", status_code=200)
def get_user(username: str, db: Session = Depends(get_db)) -> TravelUserSchema:
    try:
        db_user = db.scalars(select(TravelUser).where(
            TravelUser.username == username)).first()
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found!")

        return db_user

    except Exception as e:
        raise e
    

@app.post("/posts/experience/user/}", status_code=201)
def add_experience(experience: ExperienceSchema, db: Session = Depends(get_db)):
    try:
        db_experience = Experience(**experience.model_dump())
        db.add(db_experience)
        db.commit()
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Could not add experience")
    return db_experience


@app.get("/experience/{title}", status_code=200)
def get_experience(title: str, db: Session = Depends(get_db)) -> ExperienceSchema:
    try:
        db_experience = db.scalars(select(Experience).where(
            Experience.title == title)).first()
        if not db_experience:
            raise HTTPException(status_code=404, detail="Experience not found!")

        return db_experience

    except Exception as e:
        raise e
    
@app.patch("/experience/{title}", status_code=200)
def update_experience(title: str, updated_experience: ExperienceUpdateSchema, db: Session = Depends(get_db)) -> ExperienceSchema:
    try:
        # Check if the experience exists
        db_experience = db.query(Experience).filter(Experience.title == title).first()
        if not db_experience:
            raise HTTPException(status_code=404, detail="Experience not found!")

        # Update only the specified fields
        for field, value in updated_experience.dict(exclude_unset=True).items():
            setattr(db_experience, field, value)

        db.commit()

        return db_experience

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    



@app.post("/", status_code=201)
async def upload_image(file: UploadFile):
    accepted_img_extensions = ['jpg', 'jpeg', 'bmp', 'webp', 'png']
    data = file.file
    filename = file.filename
    filename_splitted = filename.split(".")
    file_extension = filename_splitted[-1]
    new_img_name = uuid4()
    if file_extension not in accepted_img_extensions:
        raise HTTPException(status_code=400, detail="Image extension is not supported")
    file.filename = f"{new_img_name}.{file_extension}"
    contents = await file.read()
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
    return {"uploaded image: ": file.filename}

@app.get("/{image_name}", status_code=200)
def get_image(image_name: str):
    images = os.listdir(IMAGEDIR)
    return FileResponse(f"{IMAGEDIR}{image_name}")

app.include_router(router, prefix="/images", tags=["images"])
