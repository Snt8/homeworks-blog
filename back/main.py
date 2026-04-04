import os
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.login_api import api_registro as ar

# Ruta absoluta del archivo de datos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, "database-test.json")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verifica la existencia del JSON de persistencia al iniciar
    if not os.path.exists(JSON_PATH):
        try:
            with open(JSON_PATH, "w", encoding="utf-8") as f:
                json.dump([], f) 
        except IOError as e:
            print(f"Error de E/S al inicializar {JSON_PATH}: {e}")
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

# Registro de rutas
app.include_router(ar.router)

# Configuración de CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)