//obtener el boton
const formularioRegistro = document.getElementById("formulario-registro")

//esperar a que envie el registro
formularioRegistro.addEventListener("submit", async (e) => {
    e.preventDefault()
    //conseguir los datos ingresados
    let nombreUsuario = document.getElementById("nombreUsuarioRegistro").value
    let contrasenaUsuario = document.getElementById("passwordRegistro").value
    //enviar al backend
    let response = await enviarDatosRegistro(nombreUsuario, contrasenaUsuario)
    //verificamos como resulto el proceso
    if(response){
        alert("Registro Exitoso")
    }
})