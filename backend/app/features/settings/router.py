from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_app_settings():
    return {"settings": {}}

@router.patch("/")
async def update_settings(data: dict):
    return {"message": "Settings updated"}
