from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, Boolean, ForeignKey, DateTime, func
from datetime import datetime


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)


class User(Base):
    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(255), unique=True)
    display_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255), nullable=True)
    last_name: Mapped[str] = mapped_column(String(255), nullable=True)
    email: Mapped[str]
    country_id: Mapped[int] = mapped_column(ForeignKey())
    is_public: Mapped[Boolean]
    is_banned: Mapped[Boolean]


class Experience(Base):
    __tablename__ = "experience"

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    country_id: Mapped[int]
    longitude: Mapped[float]
    latitude: Mapped[float]
    is_positive: Mapped[Boolean]
    is_public: Mapped[Boolean]



class Country(Base):
    __tablename__ = "country"

    name: Mapped[str] = mapped_column(String(255))
