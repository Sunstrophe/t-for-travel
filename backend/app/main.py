from fastapi import FastAPI, HTTPException, Depends, status
from app.db_setup import init_db, get_db
from contextlib import asynccontextmanager
from fastapi import Request
from sqlalchemy.orm import Session, joinedload, selectinload
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, update, delete, insert
from app.database.models import User
from app.schemas import UserSchema


@asynccontextmanager
async def lifespan(app: FastAPI):
    # init_db() # Vi ska skapa denna funktion
    yield

app = FastAPI(lifespan=lifespan)


@app.post("/user", status_code=200)
def create_user(user: UserSchema, db: Session = Depends(get_db)):
    try:
        db_user = User(**user.model_dump())
        db.add(db_user)
        db.commit()
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Could not add user")
    return db_user
