from fastapi import HTTPException, status, Response, Depends, APIRouter
from app.db_setup import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete, insert
from fastapi import Request, BackgroundTasks
from sqlalchemy.exc import IntegrityError
from app.database.models import TravelUser
from app.schemas import NewPasswordSchema, Token, TravelUserSchema, TravelUserOutSchema, UserRegisterSchema
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from app.security import hash_password, verify_password, create_access_token, get_current_user
from pydantic import ValidationError
from datetime import timedelta
from pprint import pprint
from dotenv import load_dotenv
from app.email import generate_password_reset_token, send_password_reset_email, get_user_by_email, verify_password_reset_token
import os

load_dotenv(override=True)

# TODO CREATE SETTINGSCLASS USING FASTAPI SOLUTION
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

router = APIRouter(tags=["auth"])


@router.post("/user/token")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)) -> Token:
    traveluser = db.query(TravelUser).filter(TravelUser.email == form_data.username).first()
    # user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not traveluser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User does not exist",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not verify_password(form_data.password, traveluser.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Passwords do not match",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": str(traveluser.id)}, expires_delta=access_token_expires
    )

    print({"access_token": access_token, "token_type": "bearer"})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/user/create", status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserRegisterSchema, db: Session = Depends(get_db)):
    # Validate data from UserRegisterSchema
    user_dict = user_data.model_dump()
    print(user_dict)
    print(user_dict["hashed_password"])

    # Set default values for is_public and is_banned
    user_dict['is_public'] = True
    user_dict['is_banned'] = False

    # Hash the password
    hashed_password = hash_password(user_dict["hashed_password"])
    user_dict['hashed_password'] = hashed_password

    # Create a TravelUser instance
    new_user = TravelUser(**user_dict)

    # Add user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/me", response_model=TravelUserOutSchema)
def read_users_me(current_user: Annotated[TravelUser, Depends(get_current_user)]):
    return current_user


@router.post("/reset-password/", status_code=status.HTTP_200_OK)
def reset_password(body: NewPasswordSchema, db: Session = Depends(get_db)):
    """
    Reset password using a token a user should have received through a PW reset email
    """
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = get_user_by_email(session=db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    hashed_password = hash_password(password=body.new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"message": "Password updated"}