// logica_perfil.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const LOGGED_IN_USER_KEY = 'loggedInUser';
const LOGOUT_URL = 'iniciar_sesion.xml';

// --- Datos Ficticios para Demostración ---
// Como el XML de usuarios no contiene datos de adopción, los simulamos aquí
const ADOPCIONES_SIMULADAS = {
    // La clave es el ID del usuario (u1, u2, etc.)
    'u1': [
        {
            nombre: "Firulais",
            especie: "Perro • Mestizo",
            fecha: "05/10/2025",
            coadoptante: "Javier López",
            imagen: "assets/firulais.jpg" // Asegúrate de tener esta imagen en tu carpeta assets
        }
    ],
    // Usuario sin adopciones
    'u2': []
};
// ----------------------------------------


/**
 * Busca los datos del usuario logueado en el XML almacenado.
 * @param {string} userId - El ID del usuario (ej: 'u1').
 * @param {Document} xmlDoc - El documento XML completo.
 * @returns {object | null} Los datos del usuario como objeto plano, o null si no se encuentra.
 */
function getUserData(userId, xmlDoc) {
    const xpath = `/registro_usuario/usuarios/usuario[@id='${userId}']`;
    const userNode = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    if (!userNode) return null;
    
    const data = {};
    const children = userNode.children;
    for (let i = 0; i < children.length; i++) {
        data[children[i].tagName] = children[i].textContent;
    }
    data.id = userId;
    return data;
}

/**
 * Renderiza la sección de Datos Personales.
 */
function renderDatosPersonales(userData) {
    const placeholder = document.getElementById('datos-personales-placeholder');
    if (!placeholder) return;

    // Solo mostramos los campos visibles en la imagen de referencia
    const html = `
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Teléfono:</strong> ${userData.telefono}</p>
        <p><strong>Dirección:</strong> ${userData.direccion}</p>
    `;
    placeholder.innerHTML = html;
    
    // Actualizar Header
    const userInfo = document.getElementById('user-info-placeholder');
    userInfo.innerHTML = `Bienvenido/a, ${userData.nombre} ${userData.apellidos} (ID: ${userData.id})`;
}

/**
 * Renderiza la sección de Adopciones.
 */
function renderAdopciones(userId) {
    const placeholder = document.getElementById('adopciones-placeholder');
    if (!placeholder) return;

    const adopciones = ADOPCIONES_SIMULADAS[userId] || [];
    
    if (adopciones.length === 0) {
        // Mostrar mensaje si no hay adopciones
        placeholder.innerHTML = '<p class="no-adoptions">No tienes más adopciones registradas.</p>';
        return;
    }

    let html = '';
    adopciones.forEach(adopcion => {
        html += `
            <div class="adoption-card">
                <img src="${adopcion.imagen}" alt="Imagen de ${adopcion.nombre}">
                <h3>${adopcion.nombre}</h3>
                <p><strong>Especie:</strong> ${adopcion.especie}</p>
                <p><strong>Fecha:</strong> ${adopcion.fecha}</p>
                <p><strong>Coadoptante:</strong> ${adopcion.coadoptante}</p>
            </div>
        `;
    });
    
    placeholder.innerHTML = html;
}

/**
 * Lógica principal: Cargar datos y renderizar.
 */
function loadAndRenderProfile() {
    const loggedInUser = sessionStorage.getItem(LOGGED_IN_USER_KEY);

    // 1. Verificar si hay sesión
    if (!loggedInUser) {
        alert("Debes iniciar sesión para ver tu perfil.");
        window.location.href = LOGOUT_URL;
        return;
    }

    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    
    // 2. Cargar datos del XML
    if (!xmlString) {
        alert("Error: No se encontraron datos de registro. Redirigiendo a inicio de sesión.");
        window.location.href = LOGOUT_URL;
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const userData = getUserData(loggedInUser, xmlDoc);

    if (!userData) {
        alert("Error: No se encontraron datos para tu ID de usuario. Redirigiendo a inicio de sesión.");
        sessionStorage.removeItem(LOGGED_IN_USER_KEY);
        window.location.href = LOGOUT_URL;
        return;
    }
    
    // 3. Renderizar las secciones
    renderDatosPersonales(userData);
    renderAdopciones(userData.id);
}

/**
 * Asigna el evento de Cerrar Sesión.
 */
function setupLogoutButton() {
    const logoutBtn = document.getElementById('cerrar-sesion-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem(LOGGED_IN_USER_KEY);
            alert("Has cerrado tu sesión.");
            window.location.href = LOGOUT_URL;
        });
    }
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Usamos MutationObserver para asegurarnos de que el XSLT ha terminado de renderizar el HTML
    const observer = new MutationObserver((mutationsList, observer) => {
        const mainContent = document.querySelector('.main-container');
        if (mainContent) {
            loadAndRenderProfile();
            setupLogoutButton();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});