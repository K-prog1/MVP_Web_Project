from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json

app = FastAPI(title="VETKA API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegister(BaseModel):
    full_name:str
    email:str
    password:str
    company: Optional[str] = None
    position: Optional[str] = None
    phone: Optional[str] = None

class UserLogin(BaseModel):
    emain: str
    password:str

class LikeCreate(BaseModel):
    to_user_id: int
    is_like:bool = True

users_db=[]
liked_db=[]
current_id= 5

test_users = [
    {
        "id": 1,
        "full_name": "Александр",
        "email": "alex@example.com",
        "company": "Свой бизнес",
        "position": "Предприниматель",
        "interests": "Финансы и прибыль",
        "bio": "Усердный, читаю много книг.",
        "avatar_url": "http://localhost:8000/static/photo_1.jpg",
        "age": 23,
        "created_at": "2024-01-15T10:00:00"
    },
    {
        "id": 2,
        "full_name": "Саша",
        "email": "sasha@example.com",
        "company": "ИТ компания",
        "position": "Программист",
        "interests": "Программирование на 1C",
        "bio": "Программирую на 1C полтора года.",
        "avatar_url": "http://localhost:8000/static/photo_2.jpg",
        "age": 27,
        "created_at": "2024-01-16T11:00:00"
    },
    {
        "id": 3,
        "full_name": "Сергей",
        "email": "sergey@example.com",
        "company": "Энергетическая компания",
        "position": "Электрик",
        "interests": "Устраивать взрывы",
        "bio": "Недавно закончил учёбу. Без опыта.",
        "avatar_url": "http://localhost:8000/static/photo_3.jpg",
        "age": 35,
        "created_at": "2024-01-17T12:00:00"
    },
    {
        "id": 4,
        "full_name": "Антон",
        "email": "anton@example.com",
        "company": "Машиностроительный завод",
        "position": "Инженер",
        "interests": "3D-моделирование и прототипирование",
        "bio": "Инженер-конструктор с 7-летним опытом в машиностроении.",
        "avatar_url": "http://localhost:8000/static/photo_4.jpg",
        "age": 30,
        "created_at": "2024-01-18T13:00:00"
    }
]

users_db.extend(test_users)

@app.get("/")
def read_root():
    return {"message":"Vetka Api, работает!", "users_count": len(users_db)}

@app.post("/api/auth/register")

def register(user_data: UserRegister):
    global current_id

    if any(u["email"] == user_data.email for u in users_db):
        raise HTTPException(status_code=400, detail= "Email уже зарегистрирован")
    
    new_user = {
        "id": current_id,
        "full_name": user_data.full_name,
        "email": user_data.email,
        "company": user_data.company or "",
        "position": user_data.position or "",
        "interests":" ",
        "bio": " ",
        "avatar_url":"./frontend/src/assets/default_avatar.png",
        "age": 0,
        "created_at": datetime.now().isoformat()
    }

    users_db.append(new_user)
    current_id += 1

    token = f"vetka-token-{new_user["id"]}"

    return {
        "acces_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "full_name": new_user["full_name"],
            "email": new_user['email'],
            "company": new_user["company"],
            "position": new_user["position"]
        }
    }

@app.post("/api/auth/login")
def login(user_data: UserLogin):
    for user in users_db:
        if user["email"] == user_data.email:
            token = f"vetka-token-{user["id"]}"
            return {
                "access_token": token,
                "token_type": "bearer",
                "user": {
                    "id": user["id"],
                    "full_name": user["full_name"],
                    "email": user["email"],
                    "company": user["company"],
                    "position": user["position"]
                }
            }
    raise HTTPException(status_code=401, detail="Неверно введены учетные данные")

@app.get("/api/auth/me")

def get_current_user(token:str = ""):
    if not token or not token.startswith("vetka-token-"):
        raise HTTPException(status_code=401, detail="Введен неверный токен")
    
    try:
        users_id = int(token.split("-")[-1])
        user = next((u for u in users_db if u["id"] == users_id), None)
        
        if user:
            return {
                "id": user["id"],
                "full_name": user["full_name"],
                "email": user["email"],
                "company": user["company"],
                "position": user["position"]
            }
    except:
        pass
    
    raise HTTPException(status_code=401, detail="Пользователь не найден")

@app.get("/api/users/feed")
def get_feed(token: str = "", page: int = 1, limit: int = 10):
    if not token or not token.startswith("vetka-token-"):
        raise HTTPException(status_code=401, detail="Неавторизован")
    try:
        current_user_id = int(token.split("-")[-1])

        liked_ids = [like["to_user_id"] for like in liked_db
                     if like["from_user_id"] == current_user_id]
        
        filtered_users = [
            user for user in test_users
            if user["id"] != current_user_id
            and user["id"] not in liked_ids
        ]

        start = (page -1) * limit
        end = start + limit
        paginated_users = filtered_users[start:end]

        return {
            "users":paginated_users,
            "page": page,
            "has_more": end < len(filtered_users),
            "total": len(filtered_users)
        }

    except:
        raise HTTPException(status_code=400, detail="Ошибка получение ленты")
    

@app.post("/api/likes")
def create_like(like_data: LikeCreate, token: str = ""):
    if not token or not token.startswith("vetka-token-"):
        raise HTTPException(status_code=401, detail="Неавторизован")
    
    try:
        from_user_id = int(token.split("-")[-1])
        
    
        liked_db.append({
            "id": len(liked_db) + 1,
            "from_user_id": from_user_id,
            "to_user_id": like_data.to_user_id,
            "is_like": like_data.is_like,
            "created_at": datetime.now().isoformat()
        })
        

        mutual = any(
            like["from_user_id"] == like_data.to_user_id 
            and like["to_user_id"] == from_user_id
            and like["is_like"] == True
            for like in liked_db
        )
        
        return {
            "success": True,
            "action": "like" if like_data.is_like else "dislike",
            "matched": mutual
        }
    except:
        raise HTTPException(status_code=400, detail="Ошибка при обработке лайка")
    
@app_get("/api/likes/my-likes")
def get_my_likes(token: str = ""):
    if not token or not token.startswith("vetka-token-"):
        raise HTTPException(status_code=400, detail = "Неавторизован")

    try:
        user_id = int(token.split("-"[-1]))

        liked_user_ids = [
            like["to_user_id"] for like in liked_db
            if like["from_user_id"] == user_id and like["is_like"] == True
        ]

        liked_users = [
            user for user in test_users
            if user["id"] in liked_user_ids
        ]
        return liked_users

    except:
        raise HTTPException(status_code=400, detail="Ошибка получение лайков")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000, reload= True)