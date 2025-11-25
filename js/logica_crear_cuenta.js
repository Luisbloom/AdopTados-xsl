// =======================
// FUNCIONES DE USUARIO
// =======================

// Cargar usuarios desde localStorage
function cargarUsuarios() {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Registrar usuario nuevo
function registrarUsuario(username, password) {
    const usuarios = cargarUsuarios();

    // Comprobar si ya existe
    const existe = usuarios.find(u => u.username === username);

    if (existe) {
        return { ok: false, msg: "El usuario ya existe." };
    }

    usuarios.push({ username, password });
    guardarUsuarios(usuarios);

    return { ok: true, msg: "Cuenta creada correctamente." };
}

// Iniciar sesión
function loginUsuario(username, password) {
    const usuarios = cargarUsuarios();

    const user = usuarios.find(u => u.username === username && u.password === password);

    if (!user) {
        return { ok: false, msg: "Usuario o contraseña incorrectos." };
    }

    // Guardar sesión
    localStorage.setItem("sesion_activa", username);

    return { ok: true, msg: "Sesión iniciada." };
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("sesion_activa");
}

// Comprobar sesión activa
function obtenerSesion() {
    return localStorage.getItem("sesion_activa");
}

// =======================
// MANEJO DE FORMULARIOS
// =======================

// FORM: registro
const formRegistro = document.getElementById("form-registro");
if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("reg-usuario").value.trim();
        const password = document.getElementById("reg-password").value.trim();

        const r = registrarUsuario(usuario, password);

        alert(r.msg);

        if (r.ok) formRegistro.reset();
    });
}

// FORM: login
const formLogin = document.getElementById("form-login");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("log-usuario").value.trim();
        const password = document.getElementById("log-password").value.trim();

        const r = loginUsuario(usuario, password);

        alert(r.msg);

        if (r.ok) {
            // Redirige a una página protegida si quieres
            window.location.href = "index.html";
        }
    });
}

// Mostrar usuario logueado
const panelUsuario = document.getElementById("usuario-logueado");
if (panelUsuario) {
    const sesion = obtenerSesion();
    if (sesion) {
        panelUsuario.textContent = "Sesión iniciada como: " + sesion;
    } else {
        panelUsuario.textContent = "No hay sesión activa.";
    }
}

// Botón cerrar sesión
const btnLogout = document.getElementById("logout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        cerrarSesion();
        alert("Sesión cerrada.");
        window.location.reload();
    });
}
