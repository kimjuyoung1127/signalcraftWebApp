from fastapi import APIRouter, HTTPException
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.get("/")
async def list_machines():
    # In a real app, we'd verify the JWT token
    user_id = "00000000-0000-0000-0000-000000000001"
    
    try:
        response = supabase.table("devices").select("*").eq("user_id", user_id).execute()
        machines = []
        
        for d in response.data:
            # Map DB status to frontend status
            status_map = {
                "GOOD": "running",
                "WARNING": "warning",
                "DANGER": "danger"
            }
            
            machines.append({
                "id": str(d["id"]),
                "name": d["name"],
                "location": "A구역" if d["location_info"] is None else d["location_info"].get("address", "A구역"),
                "status": status_map.get(d["status"], "running"),
                "health": 100 if d["status"] == "GOOD" else (70 if d["status"] == "WARNING" else 40),
                "prediction": d["config"].get("prediction", "AI 예측 진행 중") if d["config"] else "AI 예측 진행 중",
                "imageUrl": f"https://placehold.co/200x200?text={d['name']}",
                "type": d["model_type"].lower() if d["model_type"] else "freezer"
            })
            
        return {"machines": machines}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def register_machine(data: dict):
    return {"message": "Machine registered"}
