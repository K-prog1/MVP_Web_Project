users_db = []
liked_db = []
current_id = 1


test_users = [
    {
        "id": 1,
        "full_name": "Александр",
        "email": "alex@example.com",
        "password": "123", 
        "company": "Свой бизнес",
        "position": "Предприниматель",
        "interests": "Финансы и прибыль",
        "bio": "Усердный, читаю много книг.",
        "avatar_url": "http://localhost:8000/static/photo_1.jpg",
        "age": 23,
        "created_at": "2025-01-15T10:00:00"
    },
    {
        "id": 2,
        "full_name": "Саша",
        "email": "sasha@example.com",
        "password": "123", 
        "company": "ИТ компания",
        "position": "Программист",
        "interests": "Программирование на 1C",
        "bio": "Программирую на 1C полтора года.",
        "avatar_url": "http://localhost:5173/static/photo_2.jpg",
        "age": 27,
        "created_at": "2025-01-16T11:00:00"
    },
    {
        "id": 3,
        "full_name": "Сергей",
        "email": "sergey@example.com",
        "password": "123",  
        "company": "Энергетическая компания",
        "position": "Электрик",
        "interests": "Устраивать взрывы",
        "bio": "Недавно закончил учёбу. Без опыта.",
        "avatar_url": "http://localhost:5173/static/photo_3.jpg",
        "age": 35,
        "created_at": "2025-01-17T12:00:00"
    },
    {
        "id": 4,
        "full_name": "Антон",
        "email": "anton@example.com",
        "password": "123",  
        "company": "Машиностроительный завод",
        "position": "Инженер",
        "interests": "3D-моделирование и прототипирование",
        "bio": "Инженер-конструктор с 7-летним опытом в машиностроении.",
        "avatar_url": "http://localhost:5173/static/photo_4.jpg",
        "age": 30,
        "created_at": "2025-01-18T13:00:00"
    }
]

users_db.extend(test_users)
current_id = max(user["id"] for user in users_db) + 1
