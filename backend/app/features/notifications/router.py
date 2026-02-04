from fastapi import APIRouter, HTTPException
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.get("/")
async def list_notifications():
    # In a real app, we'd verify the JWT token
    user_id = "00000000-0000-0000-0000-000000000001"
    
    try:
        response = supabase.table("notifications").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        
        notifications = []
        if response.data:
            for n in response.data:
                notifications.append({
                    "id": str(n["id"]),
                    "type": n["type"],
                    "title": n["title"],
                    "message": n["message"],
                    "isRead": n["is_read"],
                    "createdAt": n["created_at"]
                })
            
        return {"notifications": notifications}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{notification_id}/read")
async def mark_as_read(notification_id: str):
    try:
        response = supabase.table("notifications").update({"is_read": True}).eq("id", notification_id).execute()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/mark-all-read")
async def mark_all_as_read():
    user_id = "00000000-0000-0000-0000-000000000001"
    try:
        response = supabase.table("notifications").update({"is_read": True}).eq("user_id", user_id).execute()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
