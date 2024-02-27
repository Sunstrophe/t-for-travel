from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, Boolean, ForeignKey, DateTime, func
from datetime import datetime


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)


class User(Base):
    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(255), unique=True)
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str]
    country_id: Mapped[int]
    is_banned: Mapped[Boolean]


class Experience(Base):
    __tablename__ = "experience"

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    country_id: Mapped[int]
    longitude: Mapped[float]
    latitude: Mapped[float]
    is_positive: Mapped[Boolean]


class Country(Base):
    __tablename__ = "country"

    name: Mapped[str] = mapped_column(String(255))
