from pydantic import BaseModel, Field, ConfigDict, EmailStr, SecretStr


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
    country_id: int = Field(..., description="id for whatever country the user has set for their account")
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
                "country_id": 1,
                "is_public": True,
                "is_banned": False
            }
        }
    )

class ExperienceSchema(BaseModel):
    title: str = Field(..., min_length=1, max_length=100,
                            description="The name of the experience.")
    description: str = Field(...,min_length=3, max_length=25
                                description="The description of the experience.",
                                       5)
    country_id: int = Field(..., description="id for which country it is in")
    latitude: float
    longitude: float
    
    # picture:  associate picture with an id?
    is_positive: bool | None = True
    is_public: bool | None = True

    model_config = ConfigDict(
        from_attributes=True, json_schema_extra={
            "example": {
                "title": "Vetekatten",
                "description": "A lovely place for a fika, I can highly recommend it!",
                "country_id": 1,
                "latitude": 59.3342,
                "longitude": 18.0586,
                "is_positive": True,
                "is_public": False
            }
        })
