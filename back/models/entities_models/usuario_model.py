from __future__ import annotations
from pydantic import BaseModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.entities_models.curso_model import Curso

class Usuario(BaseModel):
    nombre: str
    contrasena: str
    curso: Curso | None = None

from models.entities_models.curso_model import Curso
Usuario.model_rebuild()
        