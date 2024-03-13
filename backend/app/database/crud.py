
from sqlalchemy.orm import Session

from . import models
from .. import schemas

def get_user(db: Session, user_id: int):
    return db.query(models.TravelUser).filter(models.TravelUser.id == user_id).first()