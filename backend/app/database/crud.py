
from sqlalchemy.orm import Session

from . import models
from .. import schemas


def get_user(db: Session, user_id: int):
    return db.query(models.TravelUser).filter(models.TravelUser.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.TravelUser).filter(models.TravelUser.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 0):
    return db.query(models.TravelUser).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.TravelUserSchema):
    db_user = models.TravelUser(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_experience(db: Session, experience: schemas.ExperienceSchema):
    db_experience = models.Experience(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh()
    return db_experience


def get_experience(db: Session, experience_id: int):
    return db.query(models.Experience).filter(models.Experience.id == experience_id).first()
