document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Detenemos el envío automático
    
    console.log("1. ¡Hiciste clic en el botón de registro!"); // Mensaje de rastro

    // Capturamos los datos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("2. Datos capturados:", nombre, email); // Verificamos si los leyó

    // La parte de la "Caja" (LocalStorage)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Creamos el objeto con rol cliente
    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password,
        rol: "cliente"
    };

    // Guardamos
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log("3. ¡Guardado con éxito en LocalStorage!");
    alert("Usuario registrado correctamente");

    // Redirigir al login
    window.location.href = "login.html";
});