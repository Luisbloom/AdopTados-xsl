// logica_iniciar_sesion.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const REDIRECT_URL = 'perfil_personal.xml'; // URL a la que se redirige tras login exitoso

/**
 * Función que maneja el envío del formulario y valida las credenciales.
 */
function manejarLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const contrasenaInput = document.getElementById('contrasena').value.trim();

    if (!emailInput || !contrasenaInput) {
        alert("Por favor, introduce tu email y contraseña.");
        return;
    }

    const xmlString = localStorage.getItem(XML_STORAGE_KEY);

    if (!xmlString) {
        alert("Error: No hay datos de usuario almacenados. Intenta registrarte primero.");
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // Usar XPath para encontrar al usuario por email y contraseña
    // ADVERTENCIA: Esta es una búsqueda en texto plano, solo adecuada para ejercicios locales.
    const xpath = `/registro_usuario/usuarios/usuario[email='${emailInput}' and contrasena='${contrasenaInput}']`;
    
    // Evaluar XPath
    const userNode = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (userNode) {
        // Login exitoso
        alert(`¡Bienvenido de nuevo! Iniciaste sesión como ${emailInput}.`);
        
        // Simulación de sesión: guardamos el ID del usuario en sessionStorage
        const userId = userNode.getAttribute('id');
        sessionStorage.setItem('loggedInUser', userId);
        
        // Redirigir al panel de adopciones
        window.location.href = REDIRECT_URL;
    } else {
        // Login fallido
        alert("Error: Credenciales incorrectas. Verifica tu email y contraseña.");
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Adjuntar el manejador de eventos al formulario
    const observer = new MutationObserver((mutationsList, observer) => {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', manejarLogin);
            observer.disconnect();
        }
    });
    // Observar el cuerpo del documento hasta que el XSLT renderice el formulario
    observer.observe(document.body, { childList: true, subtree: true });
});