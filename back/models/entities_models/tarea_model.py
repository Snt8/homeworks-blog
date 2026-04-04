from pydantic import BaseModel
from datetime import datetime

class Tarea(BaseModel):
    materia: str
    nombre_tarea: str
    trabajo: str
    fecha_entrega: datetime 
