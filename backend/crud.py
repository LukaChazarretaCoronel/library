from sqlalchemy.orm import Session
from . import models, schemas 
from .models import Book, BookRead

def get_books(db:Session, skip: int = 0, limit: int = 10):
    return db.query(models.Book).offset(skip).limit(limit).all()

def get_finished_books(db:Session, skip: int = 0, limit: int = 10):
    return db.query(models.BookRead).offset(skip).limit(limit).all()

def create_book(db:Session, book: schemas.BookCreate):
    db_book = models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_book_by_id(db:Session, book_id: int):
    return db.query(models.Book).filter(models.Book.id == book_id).first()

def get_finished_book_by_id(db:Session, book_id: int):
    return db.query(models.BookRead).filter(models.BookRead.id == book_id).first()

def update_book(db:Session, book_id: int, book_update:schemas.BookCreate):
    db_book= db.query(models.Book).filter(models.Book.id == book_id).first()
    if db_book:
        for key, value in book_update.dict().items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
    return db_book

def finish_book(db:Session, book_id:int):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if book :
        book_read = BookRead(
            title=book.title,
            total_pages=book.total_pages,
            pages_read=book.pages_read,
            date_start=book.date_start,
            date_finish=book.date_finish
        )
        db.add(book_read)
        db.delete(book)
        db.commit()
        return book_read
    return None

def delete_book(db: Session, book_id: int):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book