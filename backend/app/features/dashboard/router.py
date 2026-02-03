from fastapi import APIRouter
from app.features.dashboard.machine_detail.router import router as machine_detail_router

router = APIRouter()

@router.get("/")
async def get_dashboard_summary():
    return {"message": "Dashboard summary data"}

# Include sub-routers
router.include_router(machine_detail_router, prefix="/machine-detail", tags=["Machine Detail"])
