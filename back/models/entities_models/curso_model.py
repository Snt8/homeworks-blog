from __future__ import annotations
from pydantic import BaseModel
from models.entities_models.tarea_model import Tarea
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.entities_models.usuario_model import Usuario

class Curso(BaseModel):
    estudiantes: list[Usuario]
    tareas: list[Tarea]

from models.entities_models.usuario_model import Usuario
Curso.model_rebuild()
