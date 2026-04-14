from back.services.json.escribir_json import convertor_json as cj

class ManagerJson:
    def __init__(self, convertor_json: cj.ConvertidorJson):
        self.convertor_json = convertor_json
    #definimos el metodo para que el manager llame a todos los metodos del json

    def convertir_json(self):
        self.convertor_json.leer_json()
        self.convertor_json.anadir_nuevos_datos()
        resultado = self.convertor_json.escribir_nueva_informacion()
        #retornamos el resultado
        return resultado