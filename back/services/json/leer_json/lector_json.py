import json

class LectorJson():
    def __init__(self, archivo_json: str) -> dict:
        self._archivo_json = archivo_json

    def leer_json(self):
        with open(self._archivo_json, "r") as datos:
            contenido_archivo: dict = datos
            