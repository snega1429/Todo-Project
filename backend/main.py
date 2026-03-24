
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import create_engine
from pydantic import BaseModel
import os
from typing import List, Optional


DATABASE_URL = "sqlite:///./todo.db"  
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    todos = relationship("Todo", back_populates="owner")

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category = Column(String)
    due_date = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="todos")


Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    email: str
    password: str

class TodoCreate(BaseModel):
    title: str
    category: str
    due_date: str
    owner_id: int

class TodoResponse(BaseModel):
    id: int
    title: str
    category: str
    due_date: str
    owner_id: int
    class Config:
        from_attributes = True


app = FastAPI()

origins = [os.getenv("FRONTEND_URL")]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://delicate-souffle-7050ee.netlify.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "API running"}


@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    new_user = User(email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Signup successful", "user_id": new_user.id}


@app.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email.strip()).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid password")
    return {"message": "Login successful", "user_id": db_user.id}


@app.post("/todos")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = Todo(
        title=todo.title,
        category=todo.category,
        due_date=todo.due_date,
        owner_id=todo.owner_id
    )
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return {"message": "Todo created successfully", "todo_id": new_todo.id}


@app.get("/todos", response_model=List[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}