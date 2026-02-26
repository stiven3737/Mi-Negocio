document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;

    // 1. Sacamos la lista de usuarios de la "caja" (LocalStorage)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 2. Buscamos si existe un usuario con ese correo y esa contraseña
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === pass);

    if (usuarioEncontrado) {
        // 3. ¡Lo encontramos! Ahora miramos su "brazalete" (rol)
        alert("¡Bienvenido de nuevo, " + usuarioEncontrado.nombre + "!");

        // ESTO ES NUEVO: Nos dirá en la consola qué rol detectó
        console.log("El rol detectado es: ", usuarioEncontrado.rol);

        if (usuarioEncontrado.rol === "admin") {
            // Si es admin, lo mandamos a la página de control total
            window.location.href = "admin.html";
        } else {
            // Si es cliente, lo mandamos a su perfil de compras
            window.location.href = "perfil-cliente.html";
        }
    } else {
        // 4. Si no coincide nada, le avisamos
        alert("Correo o contraseña incorrectos. Intenta de nuevo.");
    }
});