from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import books
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  # Permitir solicitudes desde tu frontend
    # Puedes agregar otros orígenes si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir estos orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

app.include_router(books.router)
