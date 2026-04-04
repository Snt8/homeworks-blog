from fastapi import APIRouter, HTTPException
from models.entities_models import  usuario_model as um
from services.encriptar import encriptar_contrasena as ec
from services.json import convertor_json as cj
from services.json import manager_json as mj
import os

#instanciamos el router
router: APIRouter = APIRouter()


#creamos el post
@router.post("/usuario")
async def registrar_usuario(datos_usuario: um.Usuario):
    # Definimos la ruta absoluta para evitar errores de ejecución según el directorio
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, "../../database-test.json")

    usuario_guardado: dict = {
        "nombre": datos_usuario.nombre, 
        "contrasena": ec.encriptar_contrasena(datos_usuario.contrasena).decode("utf-8")
    }

    convertidor_json: cj.ConvertidorJson = cj.ConvertidorJson(json_path, usuario_guardado)
    manager_json: mj.ManagerJson = mj.ManagerJson(convertidor_json)
    resultado = manager_json.convertir_json()

    if resultado:
        return {"estado": "proceso exitoso"}

    else: 
        raise HTTPException(status_code=500, detail="Error al guardar en la base de datos")
