from pydantic import BaseModel, Field, ConfigDict, EmailStr, SecretStr
from typing import Optional


class TravelUserSchema(BaseModel):
    username: str = Field(..., min_length=4, max_length=16,
                          description="The name used to login to the users account.")
    display_name: str = Field(..., min_length=1, max_length=16,
                              description="The name displayed to other users.")
    first_name: str = Field(..., min_length=1, max_length=50,
                            description="First name of user")
    last_name: str = Field(..., min_length=1, max_length=50,
                           description="Last name of user")
    email: EmailStr = Field(..., min_length=1, max_length=255,
                            description="The email for the user")
    # password: SecretStr = Field(..., min_length=8, max_length=255)
    country_id: int | None = None
    is_public: bool | None = True
    is_banned: bool | None = False

    model_config = ConfigDict(
        from_attributes=True, json_schema_extra={
            "example": {
                "username": "myusername",
                "display_name": "Coolguy123",
                "first_name": "John",
                "last_name": "Doe",
                "email": "john_doe@example.com",
                "country_id": None,
                "is_public": True,
                "is_banned": False
            }
        }
    )


class ExperienceSchema(BaseModel):
    title: str = Field(..., min_length=3, max_length=100,
                       description="The name of the experience.")
    description: str = Field(..., max_length=255,
                             description="The description of the experience.",
                             )
    image: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    user_id: int | None = None
    is_positive: bool | None = True
    is_public: bool | None = True

    model_config = ConfigDict(
        from_attributes=True, json_schema_extra={
            "example": {
                "title": "Vetekatten",
                "description": "A lovely place for a fika, I can highly recommend it!",
                "image": None,
                "latitude": 59.3342,
                "longitude": 18.0586,
                "user_id": None,
                "is_positive": True,
                "is_public": False
            }
        })


class ExperienceUpdateSchema(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100,
                                 description="The name of the experience.")
    description: Optional[str] = Field(None, min_length=3, max_length=255,
                                       description="The description of the experience.")
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    is_positive: Optional[bool] = None
    is_public: Optional[bool] = None


class ExperienceMapSchema(BaseModel):
    title: str
    description: str
    image: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    is_positive: bool | None = True
    is_public: bool | None = True
