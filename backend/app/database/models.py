from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, Text, Boolean, Float, ForeignKey, DateTime, func
from datetime import datetime


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)


class TravelUser(Base):
    __tablename__ = "traveluser"

    username: Mapped[str] = mapped_column(String(255), unique=True)
    display_name: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(255), nullable=True)
    last_name: Mapped[str] = mapped_column(String(255), nullable=True)
    email: Mapped[str]
    # password: Mapped[str] # add later
    country: Mapped["Country"] = relationship(
        "Country", back_populates="users")
    country_id: Mapped[int] = mapped_column(ForeignKey(
        "country.id", ondelete="SET NULL"), nullable=True)
    is_public: Mapped[bool]
    is_banned: Mapped[bool]

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
    description: Mapped[str] = mapped_column(String(255))
    country: Mapped["Country"] = relationship(
        "Country", back_populates="users")
    country_id: Mapped[int] = mapped_column(ForeignKey(
        "country.id", ondelete="SET NULL"), nullable=True)
    latitude: Mapped[float] = mapped_column[Float]
    longitude: Mapped[float] = mapped_column[Float]
    is_positive: Mapped[bool]
    is_public: Mapped[bool]

    def __repr__(self) -> str:
        return f"<Experience={self.title}>"