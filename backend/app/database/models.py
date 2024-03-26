from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, Boolean, Float, ForeignKey, DateTime, UniqueConstraint
from datetime import datetime


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)


class TravelUser(Base):
    __tablename__ = "traveluser"

    username: Mapped[str] = mapped_column(String(255), unique=True)
    display_name: Mapped[str] = mapped_column(String(255), nullable=True)
    first_name: Mapped[str] = mapped_column(String(255), nullable=True)
    last_name: Mapped[str] = mapped_column(String(255), nullable=True)
    email: Mapped[str]
    hashed_password: Mapped[str]
    country: Mapped["Country"] = relationship(
        "Country", back_populates="users")
    country_id: Mapped[int] = mapped_column(ForeignKey(
        "country.id", ondelete="SET NULL"), nullable=True)
    is_public: Mapped[bool]
    is_banned: Mapped[bool]
    experiences: Mapped[list["Experience"]] = relationship("Experience", back_populates="user")

    def __repr__(self) -> str:
        return f"<User={self.username}>"
    



class Country(Base):
    __tablename__ = "country"

    name: Mapped[str] = mapped_column(String(255))
    users: Mapped[list[TravelUser]] = relationship(
        "TravelUser", back_populates="country")

    def __repr__(self) -> str:
        return f"<Country={self.name}>"


class Experience(Base):
    __tablename__ = "experience"

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    # country: Mapped["Country"] = relationship(
    #     "Country", back_populates="users")
    # country_id: Mapped[int] = mapped_column(ForeignKey(
    #     "country.id", ondelete="SET NULL"), nullable=True)
    # images: Mapped[list["ImageLink"]] = relationship("ImageLink", back_populates="experience")
    image: Mapped[str] = mapped_column(String(255), nullable=True)
    latitude: Mapped[float] = mapped_column(nullable=True)
    longitude: Mapped[float] = mapped_column(nullable=True)
    is_positive: Mapped[bool]
    is_public: Mapped[bool]
    user_id: Mapped[int] = mapped_column(ForeignKey("traveluser.id", ondelete="SET NULL"), nullable=True)
    user: Mapped[TravelUser] = relationship(TravelUser, back_populates="experiences")

    def __repr__(self) -> str:
        return f"<Experience={self.title}>"


# class ImageLink(Base):
#     __tablename__ = "images"

#     experience: Mapped[Experience] = relationship("Experience", back_populates="images")
#     experience_id: Mapped[int] = mapped_column(ForeignKey(
#         "experience.id", ondelete="SET NULL"), nullable=True)
#     image_link: Mapped[str] = mapped_column(String(255))
#     order: Mapped[int] = mapped_column(Integer, autoincrement=True)
#     date_added: Mapped[datetime] = mapped_column(DateTime, default=datetime.now())

#     __table_args__ = (UniqueConstraint("experience_id", "order"), )
