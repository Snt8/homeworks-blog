async function enviarDatosRegistro(nombreUsuario, contrasenaUsuario){
    try {
        const response = await fetch("http://127.0.0.1:8000/usuario", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            
            body: JSON.stringify({
                nombre: nombreUsuario, 
                contrasena: contrasenaUsuario, 
                curso: null
            })
        })

        if(!response.ok){
            alert("Ha ocurrido un error en el registro")
            return null
        }

        const data = await response.json()
        return data
    }

    catch(error) {
        console.error("Error en la petición:", error)
        alert("No se pudo conectar con el servidor")
    }
}