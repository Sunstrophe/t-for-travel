from sqlalchemy.orm import Session
from app.database import models
from app import schemas


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
    db.refresh(db_experience)
    return db_experience


def get_experience(db: Session, experience_id: int):
    return db.query(models.Experience).filter(models.Experience.id == experience_id).first()


def update_experience(db: Session, db_experience: models.Experience, updated_experience: schemas.ExperienceUpdateSchema):
    for field, value in updated_experience.model_dump(exclude_unset=True).items():
        setattr(db_experience, field, value)
    db.commit()
    db.refresh(db_experience)
    print("test")
    return db_experience

def create_contact(db: Session, contact: schemas.ContactSchema):
    db_contact = models.Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def get_contact(db: Session, email: str):
    return db.query(models.Contact).filter(models.Contact.email == email).first()
