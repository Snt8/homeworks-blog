import bcrypt

def encriptar_contrasena(contrasena: str) -> bytes:
    contrasena_bytes = contrasena.encode("utf-8")
    salt = bcrypt.gensalt()
    #creamos el hash
    encriptada = bcrypt.hashpw(contrasena_bytes, salt)
    #retornamos la contrasena
    return encriptada