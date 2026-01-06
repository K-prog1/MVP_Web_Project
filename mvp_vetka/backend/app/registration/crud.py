from fastapi import APIRouter, HTTPException
from registration.schemas import UserRegister, UserLogin
from registration import users
from datetime import datetime
import secrets

router = APIRouter(prefix='/api/auth')

@router.post("/register")
def register(user_data: UserRegister):

    if any(u["email"] == user_data.email for u in users.users_db):
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")

    new_user = {
        "id": users.current_id,
        "full_name": user_data.full_name,
        "email": user_data.email,
        "password": user_data.password,  
        "company": user_data.company or "",
        "position": user_data.position or "",
        "interests": None,
        "bio": None,
        "avatar_url": "./frontend/src/assets/default_avatar.png",
        "age": 0,
        "created_at": datetime.now().isoformat()
    }

    users.users_db.append(new_user)
    user_id = users.current_id
    users.current_id += 1 

    token =  f"vetka-token-{user_id}"

    return {
        "token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "full_name": new_user["full_name"],
            "email": new_user['email'],
            "company": new_user["company"],
            "position": new_user["position"]
        }
    }

@router.post("/login")
def login(user_data: UserLogin):
    for user in users.users_db:
        if user["email"] == user_data.email:
            if user["password"] != user_data.password:
                raise HTTPException(status_code=401, detail="Пароль не тот")
            token =  f"vetka-token-{user['id']}"
            return {
                "token": token,
                "token_type": "bearer",
                "user": {
                    "id": user["id"],
                    "full_name": user["full_name"],
                    "email": user["email"],
                    "company": user["company"],
                    "position": user["position"]
                }
            }
    raise HTTPException(status_code=401, detail="Нет такого пользователя")