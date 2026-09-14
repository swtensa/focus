from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from routers import router
import uvicorn

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
app.mount("/images", StaticFiles(directory="images"), name="images")

# ========== СТАТИЧЕСКИЕ ФАЙЛЫ ==========
@app.get("/")
def root():
    with open("index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/login.html")
def get_login():
    with open("login.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/register.html")
def get_register():
    with open("register.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())

@app.get("/style.css")
def get_css():
    with open("style.css", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), media_type="text/css")

@app.get("/script.js")
def get_js():
    with open("script.js", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), media_type="application/javascript")

@app.get("/favicon.ico")
def get_favicon():
    return Response(status_code=204)

if __name__ == "__main__":
    uvicorn.run("back:app", host="0.0.0.0", port=8000, reload=True)