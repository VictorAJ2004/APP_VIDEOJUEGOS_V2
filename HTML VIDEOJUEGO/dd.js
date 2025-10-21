function mostrarRegistro() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("registroCard").style.display = "block";
  document.getElementById("mensajeLogin").textContent = "";
  document.getElementById("mensajeRegistro").textContent = "";
}

function volverLogin() {
  document.getElementById("registroCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("mensajeLogin").textContent = "";
  document.getElementById("mensajeRegistro").textContent = "";
}

document.getElementById("registroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value.trim();
  var apellido = document.getElementById("apellido").value.trim();
  var rut = document.getElementById("rut").value.trim();
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var contraseña = document.getElementById("contraseña").value.trim();
  var correo = document.getElementById("correo").value.trim();
  var mensaje = document.getElementById("mensajeRegistro");

  if (!nombre || !apellido || !fechaNacimiento || !contraseña || !correo) {
    mensaje.textContent = "Todos los campos son obligatorios.";
    mensaje.style.color = "red";
    return;
  }

  var hoy = new Date();
  var nacimiento = new Date(fechaNacimiento);
  var edad = hoy.getFullYear() - nacimiento.getFullYear();
  var m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  if (edad < 18) {
    mensaje.textContent = "Debes ser mayor de 18 años para registrarte.";
    mensaje.style.color = "red";
    return;
  }

  var descuento = "";
  if (correo.endsWith("@duocuc.cl")) {
    descuento = " ¡Tienes un 20% de descuento de por vida!";
  }

  var userId = "usuario_" + Date.now();
  localStorage.setItem(userId + "_nombre", nombre);
  localStorage.setItem(userId + "_apellido", apellido);
  localStorage.setItem(userId + "_rut", rut);
  localStorage.setItem(userId + "_fechaNacimiento", fechaNacimiento);
  localStorage.setItem(userId + "_contraseña", contraseña);
  localStorage.setItem(userId + "_correo", correo);

  var userIds = localStorage.getItem("userIds") ? localStorage.getItem("userIds").split(",") : [];
  userIds.push(userId);
  localStorage.setItem("userIds", userIds.join(","));

  mensaje.textContent = "Usuario registrado correctamente." + descuento;
  mensaje.style.color = "green";
  document.getElementById("registroForm").reset();
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value.trim();
  var recordarme = document.getElementById("recordarme").checked;
  var mensaje = document.getElementById("mensajeLogin");

  var userIds = localStorage.getItem("userIds") ? localStorage.getItem("userIds").split(",") : [];
  var loginExitoso = false;

  for(var i = 0; i < userIds.length; i++) {
    var userId = userIds[i];
    var storedEmail = localStorage.getItem(userId + "_correo");
    var storedPassword = localStorage.getItem(userId + "_contraseña");

    if(email === storedEmail && password === storedPassword) {
      loginExitoso = true;
      break;
    }
  }

  if (loginExitoso) {
    mensaje.textContent = "Inicio de sesión exitoso.";
    mensaje.style.color = "green";
    setTimeout(function() {
      window.location.href = "Catalogo.html";
    }, 1000);
  } else {
    mensaje.textContent = "Correo o contraseña incorrectos.";
    mensaje.style.color = "red";
  }
});