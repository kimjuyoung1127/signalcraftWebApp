from fastapi import APIRouter, HTTPException
from app.core.config import settings
from supabase import create_client, Client

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.get("/")
async def list_reports(device_id: str = None):
    # In a real app, we'd verify the JWT token
    user_id = "00000000-0000-0000-0000-000000000001"
    
    try:
        query = supabase.table("daily_reports").select("*")
        
        # In a real app, we'd filter by devices belonging to the user
        # For now, if device_id is provided, filter by it
        if device_id:
            query = query.eq("device_id", device_id)
            
        response = query.order("report_date", desc=True).execute()
        return {"reports": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/latest/{device_id}")
async def get_latest_report(device_id: str):
    try:
        response = supabase.table("daily_reports") \
            .select("*") \
            .eq("device_id", device_id) \
            .order("report_date", desc=True) \
            .limit(1) \
            .execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="리포트를 찾을 수 없습니다.")
            
        return response.data[0]
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{report_id}")
async def get_report_detail(report_id: str):
    # This might need a different table or specific query if report_id is not date+device
    return {"report_id": report_id, "content": "Report data"}
