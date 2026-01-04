import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from registration.users import users_db, liked_db
from registration.schemas import LikeCreate
from registration.crud import router as router_reg_log

app = FastAPI(title="VETKA API", version="1.0")
app.include_router(router_reg_log, tags=["Reg_Log_User"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_current_user_id(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer vetka-token-"):
        raise HTTPException(status_code=401, detail="Неавторизован")
    
    try:
        token = authorization.split(" ")[1]  
        user_id = int(token.split("-")[-1])
        return user_id
    except (ValueError, IndexError, KeyError):
        raise HTTPException(status_code=401, detail="Неверный формат токена")

@app.get("/api/auth/me")
def get_current_user(authorization: str = Header(None)):
    user_id = get_current_user_id(authorization)
    
    user = next((u for u in users_db if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    return {
        "id": user["id"],
        "full_name": user["full_name"],
        "email": user["email"],
        "company": user["company"],
        "position": user["position"]
    }

@app.post("/api/likes")
def create_like(like_data: LikeCreate, authorization: str = Header(None)):
    from_user_id = get_current_user_id(authorization)
    
    if not any(u["id"] == like_data.to_user_id for u in users_db):
        raise HTTPException(status_code=404, detail="Пользователь не найден")

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
        and like["is_like"] is True
        for like in liked_db
    )
    
    return {
        "success": True,
        "action": "like" if like_data.is_like else "dislike",
        "matched": mutual
    }

@app.get("/api/users/feed")
def get_feed(authorization: str = Header(None), page: int = 1, limit: int = 10):
    current_user_id = get_current_user_id(authorization)

    liked_ids = [
        like["to_user_id"] for like in liked_db
        if like["from_user_id"] == current_user_id
    ]

    filtered_users = [
        user for user in users_db
        if user["id"] != current_user_id
        and user["id"] not in liked_ids
    ]

    start = (page - 1) * limit
    end = start + limit
    paginated_users = filtered_users[start:end]

    return {
        "users": paginated_users,
        "page": page,
        "has_more": end < len(filtered_users),
        "total": len(filtered_users)
    }

@app.get("/api/likes/my-likes")
def get_my_likes(authorization: str = Header(None)):
    user_id = get_current_user_id(authorization)

    liked_user_ids = [
        like["to_user_id"] for like in liked_db
        if like["from_user_id"] == user_id and like["is_like"] is True
    ]

    liked_users = [
        user for user in users_db
        if user["id"] in liked_user_ids
    ]
    return liked_users

if __name__ == "__main__":
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)