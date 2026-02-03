from fastapi import APIRouter

router = APIRouter()

from fastapi import APIRouter, Header, HTTPException
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.get("/me")
async def get_my_profile(authorization: str = Header(None)):
    # In a real app, we'd verify the JWT token
    # For now, we use the super user ID
    user_id = "00000000-0000-0000-0000-000000000001"

    try:
        # 1. Fetch device count
        device_count = supabase.table("devices").select("id", count="exact").eq("user_id", user_id).execute()
        
        # 2. Return combined profile data
        return {
            "user": {
                "id": user_id,
                "email": "admin@signalcraft.com",
                "full_name": "Super Admin",
                "role": "SignalCraft 관리자"
            },
            "device_count": device_count.count if device_count.count is not None else 0,
            "plan": "Business Plus"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/me")
async def update_profile(data: dict):
    return {"message": "Profile updated"}
