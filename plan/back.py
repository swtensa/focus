from pathlib import Path

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from routers import router
import uvicorn

# Все пути считаются от папки с кодом, поэтому сервер можно запускать из любой папки
BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Focus API")

# Фронтенд и backend отдаются с одного origin, поэтому CORS нужен только
# для локальной разработки фронтенда отдельно от backend (например, Live Server).
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500", "http://127.0.0.1:5500",
        "http://localhost:8000", "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.mount("/images", StaticFiles(directory=BASE_DIR / "images"), name="images")


# ========== СТАТИЧЕСКИЕ ФАЙЛЫ ==========
def _page(name: str, media_type: str = "text/html; charset=utf-8"):
    # no-cache: после обновления кода браузер не показывает старые script.js и style.css
    return FileResponse(BASE_DIR / name, media_type=media_type, headers={"Cache-Control": "no-cache"})

@app.get("/")
def root():
    return _page("index.html")

@app.get("/login.html")
def get_login():
    return _page("login.html")

@app.get("/register.html")
def get_register():
    return _page("register.html")

@app.get("/style.css")
def get_css():
    return _page("style.css", "text/css; charset=utf-8")

@app.get("/script.js")
def get_js():
    return _page("script.js", "application/javascript; charset=utf-8")

@app.get("/favicon.ico")
def get_favicon():
    return Response(status_code=204)

if __name__ == "__main__":
    uvicorn.run("back:app", host="127.0.0.1", port=8000, reload=True, app_dir=str(BASE_DIR))
