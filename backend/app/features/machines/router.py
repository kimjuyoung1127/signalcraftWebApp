from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_machines():
    return {"machines": []}

@router.post("/")
async def register_machine(data: dict):
    return {"message": "Machine registered"}
