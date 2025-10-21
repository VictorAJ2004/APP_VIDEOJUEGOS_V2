//Productos
const productos = [
  { nombre: "Ajedrez Nación", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
  { nombre: "Mouse Logitech G203", categoria: "mouse", precio: 15990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQwP2AEHOs4GsuUT50WrRrwru940WJqRerBIy-Iq0hHz7-Pd_iUFqwNq6w96u_1uYzj2NUFkTMLPWezkCdGy2pwG3Lb8hv9jbbv5DLb6Wg1Hm1rMxHsP7DoSg" },
  { nombre: "Silla Gamer Cougar", categoria: "sillas", precio: 89990, imagen: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTi5eNOilyfzNVmsxMqbdClMluvDVBzB3XpUTEyTlfTH-bIdmfMkwisrQpaAJk17UWc_tCfKU3WmLWD5grW9yPk4qm4BWKWgoLrvax_R4O_GTZyGlSP_p5KxQ" },
  { nombre: "Polera personalizada", categoria: "poleras", precio: 12990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRLvt4kNzmCE4zAmJJ13pilIVsF-MaTRVMgHYmXo5nQD-JP90IX_Ay7YHS-6cyngVMXPYv5iCNADjHql48LkGCHet4MdfrQL7VEY0u4b47ok7afIFGO5XiC" },
  { nombre: "Servicio técnico PC", categoria: "servicio", precio: 24990, imagen: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png" },
  { nombre: "PS5", categoria: "consolas", precio: 500990, imagen: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn4yUVa6SfDCMN_XTpTBBWzGZLAdEGASk3Qag1OxZF_gP7uzZj-L-MM75Ir6kX0G-BsM8TbQ1vCPkgyAVm8ez177Z2vErrwj9oqnAT5X5pT8pbGJV49jWk" },
  { nombre: "Servicio técnico PC (Limpieza)", categoria: "servicio", precio: 10000, imagen: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7xdepzKjTDFI4mPjrdUg3uuPnvnVoIT0aXYADFIC-rBr-6CJKDECWdqXGt91B4tpunCsulkXOnWmhcZdHjHn9CmkAT9bSeOiUbuBJ0XY" },
  { nombre: "Ajedrez Nacióen", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
  { nombre: "Ajedrez Nacióen", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
  { nombre: "Ajedreze Nación", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
  { nombre: "Ajederez Nación", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
  { nombre: "Ajedreez Nación", categoria: "juegos", precio: 29990, imagen: "https://nacionajedrez.cl/cdn/shop/files/DSC016357_5000x.jpg?v=1702304297" },
];

function mostrarProductos(filtroCategoria) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  let filtrados = productos;
  if (filtroCategoria && filtroCategoria !== "todos") {
    filtrados = productos.filter(p => p.categoria === filtroCategoria);
  }
  if (filtrados.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
    return;
  }
  filtrados.forEach(producto => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Categoría: ${producto.categoria}</p>
      <p>Precio: $${producto.precio.toLocaleString()}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Filtro por categoría
document.getElementById("categoriaFiltro").addEventListener("change", function() {
  mostrarProductos(this.value);
});

function agregarAlCarrito(nombreProducto) {
  // Buscar el producto por nombre
  const producto = productos.find(p => p.nombre === nombreProducto);
  if (!producto) return;

  // Obtener carrito actual o crear uno nuevo
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si ya está en el carrito
  const index = carrito.findIndex(item => item.nombre === producto.nombre);
  if (index >= 0) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito: " + producto.nombre);
}

// Mostrar todos al cargar
mostrarProductos("todos");