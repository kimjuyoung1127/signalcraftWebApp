from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_reports():
    return {"reports": []}

@router.get("/{report_id}")
async def get_report_detail(report_id: str):
    return {"report_id": report_id, "content": "Report data"}
