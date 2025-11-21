// logica_iniciar_sesion.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const LOGGED_IN_USER_KEY = 'loggedInUser'; 
const REDIRECT_URL = 'perfil_personal.xml'; 

/**
 * Función que maneja el envío del formulario y valida las credenciales.
 */
function manejarLogin(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('email').value.trim();
    const contrasenaInput = document.getElementById('contrasena').value.trim();

    const xmlString = localStorage.getItem(XML_STORAGE_KEY);

    if (!xmlString) {
        alert("Error: No hay datos de usuario almacenados. Intenta registrarte primero.");
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // Búsqueda robusta por credenciales (//usuario)
    const xpath = `//usuario[email='${emailInput}' and contrasena='${contrasenaInput}']`;
    
    const userNode = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (userNode) {
        // LOGIN EXITOSO
        const userId = userNode.getAttribute('id');

        if (!userId) {
            alert("Error interno: Usuario encontrado pero no tiene un ID asignado.");
            return;
        }
        
        sessionStorage.removeItem(LOGGED_IN_USER_KEY);
        sessionStorage.setItem(LOGGED_IN_USER_KEY, userId); // Guarda el ID CORRECTO
        
        console.log(`[LOGIN OK] Sesión iniciada para ID: ${userId}`);
        alert(`¡Sesión iniciada! Redirigiendo a tu perfil. ID: ${userId}`);
        
        window.location.href = REDIRECT_URL;
    } else {
        alert("Error: Credenciales incorrectas. Verifica tu email y contraseña.");
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutationsList, observer) => {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', manejarLogin);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});