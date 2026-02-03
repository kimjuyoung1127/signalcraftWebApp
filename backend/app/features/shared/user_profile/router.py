from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
async def get_my_profile():
    return {"username": "user", "email": "user@example.com"}

@router.patch("/me")
async def update_profile(data: dict):
    return {"message": "Profile updated"}
