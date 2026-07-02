from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.analyze import router as analyze_router
from services.repository.sqlite import init_db

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, tags=["Analyze"], prefix="/api")
init_db()