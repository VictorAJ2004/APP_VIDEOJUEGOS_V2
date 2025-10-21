function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carritoContainer");
  const totalDiv = document.getElementById("total");
  document.getElementById("resumenCompra").innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalDiv.textContent = "";
    return;
  }
  let html = `<table>
    <tr>
      <th>Imagen</th>
      <th>Producto</th>
      <th>Categoría</th>
      <th>Precio</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
      <th>Acciones</th>
    </tr>`;
  let total = 0;
  carrito.forEach((item, i) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    html += `
      <tr>
        <td><img src="${item.imagen}" alt="${item.nombre}"></td>
        <td>${item.nombre}</td>
        <td>${item.categoria}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td>${item.cantidad}</td>
        <td>$${subtotal.toLocaleString()}</td>
        <td class="acciones">
          <button onclick="cambiarCantidad(${i}, 1)">+</button>
          <button onclick="cambiarCantidad(${i}, -1)">-</button>
          <button onclick="eliminarProducto(${i})">Eliminar</button>
        </td>
      </tr>
    `;
  });
  html += "</table>";
  contenedor.innerHTML = html;
  totalDiv.textContent = "Total: $" + total.toLocaleString();
}

function cambiarCantidad(index, cambio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  }
}

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenDiv = document.getElementById("resumenCompra");
  resumenDiv.innerHTML = "";

  if (carrito.length === 0) {
    resumenDiv.innerHTML = "<div class='resumen-card'><p>El carrito está vacío.</p></div>";
    return;
  }

  let total = 0;
  let productosHTML = "";
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    productosHTML += `
      <tr>
        <td><img src="${item.imagen}" alt="${item.nombre}" style="width:40px"></td>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toLocaleString()}</td>
        <td>$${subtotal.toLocaleString()}</td>
      </tr>
    `;
  });

  resumenDiv.innerHTML = `
    <div class="resumen-card">
      <h2>Resumen de tu compra</h2>
      <table>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unitario</th>
          <th>Subtotal</th>
        </tr>
        ${productosHTML}
      </table>
      <div class="resumen-total">
        <strong>Total: $${total.toLocaleString()}</strong>
      </div>
      <p style="text-align:center; color:green; font-weight:bold;">¡Gracias por tu compra!</p>
    </div>
  `;

  localStorage.removeItem("carrito");
  mostrarCarrito();
}

mostrarCarrito();