from sqlalchemy import Column, Integer, String, DateTime
from .database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key= True, index=True )
    title = Column(String, index= True)
    pages_read = Column(Integer, index= True)
    total_pages = Column(Integer, index= True)
    date_finish = Column(DateTime, nullable=True)
    date_start = Column(DateTime, nullable=True)

class BookRead(Base):
    __tablename__ = "book_read"
        
    id = Column(Integer, primary_key= True, index=True )
    title = Column(String, index= True)
    pages_read = Column(Integer, index= True)
    total_pages = Column(Integer, index= True)
    date_finish = Column(DateTime, nullable=True)
    date_start = Column(DateTime, nullable=True)