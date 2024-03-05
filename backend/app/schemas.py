from pydantic import BaseModel, Field, ConfigDict, EmailStr, SecretStr


class UserSchema(BaseModel):
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
    country: int
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
