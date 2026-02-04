from fastapi import APIRouter, HTTPException
from app.core.config import settings
from supabase import create_client, Client
from app.features.dashboard.machine_detail.router import router as machine_detail_router

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.get("/summary")
async def get_dashboard_summary():
    # In a real app, we'd verify the JWT token
    user_id = "00000000-0000-0000-0000-000000000001"
    
    try:
        # Fetch status counts
        response = supabase.table("devices").select("status").eq("user_id", user_id).execute()
        devices = response.data
        
        counts = {"GOOD": 0, "WARNING": 0, "DANGER": 0}
        for d in devices:
            status = d.get("status", "GOOD")
            if status in counts:
                counts[status] += 1
                
        return counts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include sub-routers
router.include_router(machine_detail_router, prefix="/machine-detail", tags=["Machine Detail"])
