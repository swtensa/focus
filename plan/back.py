from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from routers import router
import uvicorn

app = FastAPI(title="Focus API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

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

if __name__ == "__main__":
    uvicorn.run("back:app", host="0.0.0.0", port=8000, reload=True)