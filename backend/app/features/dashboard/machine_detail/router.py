from fastapi import APIRouter, HTTPException
from app.core.config import settings
from supabase import create_client, Client
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

class ServiceTicketRequest(BaseModel):
    device_id: str
    issue_type: Optional[str] = None
    description: str
    urgency: str = "normal"
    visit_date: Optional[str] = None

@router.get("/analysis")
async def get_machine_analysis(machine_id: str):
    try:
        # Fetch daily report (latest)
        report_res = supabase.table("daily_reports")\
            .select("*")\
            .eq("device_id", machine_id)\
            .order("report_date", desc=True)\
            .limit(1)\
            .execute()
        
        # Fetch forecast
        forecast_res = supabase.table("forecasts")\
            .select("*")\
            .eq("device_id", machine_id)\
            .execute()
            
        return {
            "report": report_res.data[0] if report_res.data else None,
            "forecast": forecast_res.data[0] if forecast_res.data else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/maintenance")
async def get_machine_maintenance(machine_id: str):
    try:
        response = supabase.table("maintenance_logs")\
            .select("*")\
            .eq("device_id", machine_id)\
            .order("performed_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/smart-log")
async def get_machine_smart_log(machine_id: str):
    try:
        response = supabase.table("machine_event_logs")\
            .select("*")\
            .eq("device_id", machine_id)\
            .order("occurred_at", desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/service-tickets")
async def create_service_ticket(ticket: ServiceTicketRequest):
    try:
        # In a real app, get user_id from JWT
        user_id = "00000000-0000-0000-0000-000000000001"
        
        data = {
            "device_id": ticket.device_id,
            "user_id": user_id,
            "issue_type": ticket.issue_type,
            "description": ticket.description,
            "urgency": ticket.urgency,
            "scheduled_at": ticket.visit_date
        }
        
        response = supabase.table("service_tickets").insert(data).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
