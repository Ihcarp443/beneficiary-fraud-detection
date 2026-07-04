from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.repository.sqlite import get_db_connection
from services.repository.auth import hash_password, verify_password

router = APIRouter()

class SignupRequest(BaseModel):
    email: str
    password: str


@router.post("/signup")
def signup(req: SignupRequest):

    conn = get_db_connection()
    cursor = conn.cursor()

    user = cursor.execute(
        "SELECT * FROM users WHERE email = ?",
        (req.email,)
    ).fetchone()

    if user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(req.password)

    cursor.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        (req.email, hashed)
    )

    conn.commit()

    user_id = cursor.lastrowid
    conn.close()


    return {
        "success": True,
        "user": {
            "id": user_id,
            "email": req.email,
            "user_type": "ADMIN"
        }
    }