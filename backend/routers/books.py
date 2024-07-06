from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database

router = APIRouter()

@router.get("/books/", response_model= List[schemas.Book])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    books = crud.get_books(db, skip=skip, limit=limit)
    return books

@router.get("/books/finished", response_model= List[schemas.BookRead])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    books = crud.get_finished_books(db, skip=skip, limit=limit)
    return books

@router.get("/books/{book_id}", response_model = schemas.Book)
def read_book(book_id: int, db: Session = Depends(database.get_db)):
    book = crud.get_book_by_id(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.get("/books/finished/{book_id}", response_model = schemas.BookRead)
def read_book(book_id: int, db: Session = Depends(database.get_db)):
    book = crud.get_finished_book_by_id(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.put("/books/{book_id}", response_model =schemas.Book)
def update_book(book_id: int, book:schemas.BookUpdate, db: Session = Depends(database.get_db)):
    updated_book = crud.update_book(db, book_id, book)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/books/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(database.get_db)):
    deleted_book = crud.delete_book(db, book_id)
    if deleted_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return deleted_book

@router.post("/books/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(database.get_db)):
    return crud.create_book(db=db, book=book)

@router.post("/books/finish/{book_id}", response_model = schemas.BookRead)
def finish_book(book_id:int, db:Session = Depends(database.get_db)):
    finished_book = crud.finish_book(db, book_id)
    if finished_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return finished_book
