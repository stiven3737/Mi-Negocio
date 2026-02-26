const vitrina = document.getElementById('vitrina');
const tablaPedidos = document.getElementById('tablaPedidos');

// 1. Al cargar, mostramos todo
document.addEventListener('DOMContentLoaded', () => {
    mostrarVitrina();
    mostrarPedidos();
});

// 2. MOSTRAR VITRINA (Lo que el admin subió)
function mostrarVitrina() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    vitrina.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = "producto-item";
        div.innerHTML = `
            <span><strong>${p.nombre}</strong> - $${p.precio}</span>
            <button onclick="hacerPedido('${p.nombre}')">Solicitar Compra</button>
        `;
        vitrina.appendChild(div);
    });
}

// 3. CREAR PEDIDO
function hacerPedido(nombreProd) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    
    const nuevoPedido = {
        id: Date.now(),
        producto: nombreProd,
        cantidad: 1
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    mostrarPedidos();
}

// 4. LEER PEDIDOS
function mostrarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    tablaPedidos.innerHTML = "";

    pedidos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.producto}</td>
            <td>${p.cantidad}</td>
            <td>
                <button onclick="editarCantidad(${p.id})">Editar</button>
                <button onclick="eliminarPedido(${p.id})" style="color:red">Eliminar</button>
            </td>
        `;
        tablaPedidos.appendChild(fila);
    });
}

// 5. EDITAR PEDIDO (Update)
function editarCantidad(id) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const nuevaCant = prompt("¿Cuántas unidades deseas?");
    
    if(nuevaCant && !isNaN(nuevaCant)) {
        pedidos = pedidos.map(p => p.id === id ? {...p, cantidad: nuevaCant} : p);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        mostrarPedidos();
    }
}

// 6. ELIMINAR PEDIDO (Delete)
function eliminarPedido(id) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos = pedidos.filter(p => p.id !== id);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    mostrarPedidos();
}

const btnOscuro = document.getElementById('btnOscuro');
btnOscuro.addEventListener('click', () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'rgb(31, 41, 55)' ? '#f3f4f6' : '#1f2937';
    document.body.style.color = document.body.style.color === 'white' ? '#1f2937' : 'white';
});