from fastapi import FastAPI, HTTPException, Depends, status
from app.db_setup import init_db, get_db
from contextlib import asynccontextmanager
from fastapi import Request
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update, delete, insert
from app.database.models import TravelUser
from app.schemas import TravelUserSchema


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)


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