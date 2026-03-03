from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.features.dashboard.router import router as dashboard_router
from app.features.machines.router import router as machines_router
from app.features.reports.router import router as reports_router
from app.features.settings.router import router as settings_router
from app.features.notifications.router import router as notifications_router
from app.features.shared.user_profile.router import router as user_profile_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Zero-config AI Facility Management Solution API"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(dashboard_router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["Dashboard"])
app.include_router(machines_router, prefix=f"{settings.API_V1_STR}/machines", tags=["Machines"])
app.include_router(reports_router, prefix=f"{settings.API_V1_STR}/reports", tags=["Reports"])
app.include_router(settings_router, prefix=f"{settings.API_V1_STR}/settings", tags=["Settings"])
app.include_router(notifications_router, prefix=f"{settings.API_V1_STR}/notifications", tags=["Notifications"])
app.include_router(user_profile_router, prefix=f"{settings.API_V1_STR}/shared/user-profile", tags=["Shared"])

@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "status": "online",
        "version": settings.VERSION
    }

@app.get("/debug/env")
async def debug_env():
    import os
    return {
        "supabase_url_from_settings": settings.SUPABASE_URL,
        "supabase_url_from_os": os.environ.get("SUPABASE_URL", "NOT_FOUND"),
        "supabase_key_length": len(settings.SUPABASE_KEY) if settings.SUPABASE_KEY else 0
    }

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
