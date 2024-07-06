from pydantic import BaseModel
from datetime import datetime

class BookBase(BaseModel):
    title: str
    pages_read: int
    total_pages: int
    date_start: datetime
    date_finish: datetime

class BookUpdate(BaseModel):
    title: str
    total_pages: int
    pages_read: int
    date_start: datetime
    date_finish: datetime

class BookRead(BookBase):
    id:int
    class Config:
        form_attribute = True


class BookCreate(BookBase):
    pass


class Book(BookBase):
    id: int
    class Config:
        form_attribute = True
