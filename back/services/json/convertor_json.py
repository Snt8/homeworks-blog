import json

class ConvertidorJson:
    def __init__(self, archivo: str, contenido: dict):
        self._archivo = archivo
        self._contenido = contenido
        self._lista_json = [] 

    def leer_json(self):
        try:
            with open(self._archivo, "r") as f:
                self._lista_json = json.load(f)

        except (FileNotFoundError, json.JSONDecodeError):
            pass 

    def anadir_nuevos_datos(self):
        self._lista_json.append(self._contenido)

    def escribir_nueva_informacion(self) -> bool:
        with open(self._archivo, "w") as f:
            json.dump(self._lista_json, f, indent=4)

        #Si el proceso salio bien
        return True