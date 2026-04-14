from fastapi import APIRouter

router: APIRouter = APIRouter()

@router.get("/usuario-registro")
async def revisar_registro(datos_usuario: dict):
    