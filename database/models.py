import datetime
import pytz

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database.conf import Base 

class User(Base):
    __tablename__ = 'users'
    __tableargs__ = {
        'comment' : 'Telegram users'
    }

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        autoincrement=True,
        nullable=False
    )
    telegram_id = Column(Integer, nullable=False)
    username = Column(String(50), nullable=False)
    first_name = Column(String(50))

    def __repr__(self):
        return f"User: {self.username}"


class Expenses(Base):
    __tablename__ = 'expenses'

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        autoincrement=True,
        nullable=False
    )
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='expense_user', lazy='subquery')
    name = Column(String(50), nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(
        DateTime, 
        nullable=False,
        default=datetime.datetime.now(tz=pytz.timezone('UTC'))
    )


class Incomes(Base):
    __tablename__ = 'incomes'

    id = Column(
        Integer,
        primary_key=True,
        unique=True,
        autoincrement=True,
        nullable=False
    )
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref='incomes_user', lazy='subquery')
    value = Column(Float, nullable=False)
    created_at = Column(
        DateTime, 
        nullable=False,
        default=datetime.datetime.now(tz=pytz.timezone('UTC'))
    )
