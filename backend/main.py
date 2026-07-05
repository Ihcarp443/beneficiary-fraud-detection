
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.analyze import router as analyze_router
from api.results import router as results_router
from api.signup import router as signup_router
from api.login import router as login_router
from api.bot import router as bot_router
from services.repository.sqlite import init_db
from fastapi.staticfiles import StaticFiles
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
# app.include_router()
# app.include_router(threads_router, prefix="/threads", tags=["Threads"])
app.include_router(results_router, prefix="/api/results", tags=["Results"])
app.include_router(login_router, prefix="/auth", tags=["login"])
app.include_router(signup_router, prefix="/auth", tags=["signup"])
app.include_router(bot_router, prefix="/api/bot", tags=["Bot"])
# app.include_router(feedback_router, tags=["Feedback"], prefix="/api/feedback")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

init_db()