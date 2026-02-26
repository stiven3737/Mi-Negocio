// 1. Capturamos el formulario y la tabla
const productoForm = document.getElementById('productoForm');
const tablaProductos = document.getElementById('tablaProductos');

// 2. Al cargar la página, mostramos los productos que ya existan
document.addEventListener('DOMContentLoaded', mostrarProductos);

// 3. Función para AGREGAR un producto (CREAR)
productoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturamos los datos del input
    const nombre = document.getElementById('nombreProd').value;
    const precio = document.getElementById('precioProd').value;
    const stock = document.getElementById('stockProd').value;

    // Traemos la "caja" de productos o una vacía
    const productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Creamos el nuevo objeto producto
    const nuevoProducto = {
        id: Date.now(), // Usamos la hora actual como un ID único
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    // Empujamos a la lista y guardamos en la "caja"
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));

    // Limpiamos el formulario y actualizamos la tabla
    productoForm.reset();
    mostrarProductos();
    alert("¡Producto agregado con éxito!");
});

// 4. Función para MOSTRAR los productos (LEER)
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Limpiamos la tabla antes de dibujar para no repetir
    tablaProductos.innerHTML = "";

    // Recorremos la lista y creamos una fila por cada producto
    productos.forEach((prod) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${prod.nombre}</td>
            <td>$${prod.precio}</td>
            <td>${prod.stock} u.</td>
            <td>
                <button onclick="eliminarProducto(${prod.id})" style="background:red; color:white;">Eliminar</button>
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}

// 5. Función para BORRAR (DELETE)
function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    
    // Filtramos la lista: dejamos todos MENOS el que tiene el ID que queremos borrar
    productos = productos.filter(p => p.id !== id);
    
    // Guardamos la nueva lista
    localStorage.setItem('productos', JSON.stringify(productos));
    
    // Volvemos a mostrar la tabla
    mostrarProductos();
}

let editandoID = null; // Aquí guardamos el ID del producto que queremos cambiar

// --- MODIFICAMOS LA FUNCIÓN DE GUARDAR ---
productoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreProd').value;
    const precio = document.getElementById('precioProd').value;
    const stock = document.getElementById('stockProd').value;

    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (editandoID) {
        // MODO EDICIÓN: Buscamos el producto y le cambiamos los datos
        productos = productos.map(p => {
            if (p.id === editandoID) {
                return { ...p, nombre, precio, stock };
            }
            return p;
        });
        editandoID = null; // Limpiamos la bandera
        document.querySelector('#productoForm button').innerText = "Agregar al Inventario";
    } else {
        // MODO CREACIÓN: Lo de siempre
        const nuevoProducto = { id: Date.now(), nombre, precio, stock };
        productos.push(nuevoProducto);
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    productoForm.reset();
    mostrarProductos();
});

// --- NUEVA FUNCIÓN: PREPARAR PARA EDITAR ---
function prepararEdicion(id) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const prod = productos.find(p => p.id === id);

    if (prod) {
        // Ponemos los datos en los cuadritos (inputs)
        document.getElementById('nombreProd').value = prod.nombre;
        document.getElementById('precioProd').value = prod.precio;
        document.getElementById('stockProd').value = prod.stock;

        // Cambiamos el botón para que diga "Guardar Cambios"
        editandoID = id;
        document.querySelector('#productoForm button').innerText = "Guardar Cambios";
        
        // Bonus: Scroll hacia arriba para que el usuario vea el formulario
        window.scrollTo(0, 0);
    }
}

// --- ACTUALIZAMOS LA TABLA PARA TENER EL BOTÓN DE EDITAR ---
function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    tablaProductos.innerHTML = "";

    productos.forEach((prod) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${prod.nombre}</td>
            <td>$${prod.precio}</td>
            <td>${prod.stock} u.</td>
            <td>
                <button onclick="prepararEdicion(${prod.id})" style="background:orange; color:white;">Editar</button>
                <button onclick="eliminarProducto(${prod.id})" style="background:red; color:white;">Eliminar</button>
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}

// Calculamos el valor total de la mercancía
    const totalDinero = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
    
    // Si quieres mostrarlo, añade un <div> en tu HTML con id="resumenCaja"
    const resumen = document.getElementById('resumenCaja');
    if(resumen) {
        resumen.innerHTML = `<h4>Valor Total en Inventario: $${totalDinero}</h4>`;
    }

    const btnOscuro = document.getElementById('btnOscuro');
btnOscuro.addEventListener('click', () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'rgb(31, 41, 55)' ? '#f3f4f6' : '#1f2937';
    document.body.style.color = document.body.style.color === 'white' ? '#1f2937' : 'white';
});