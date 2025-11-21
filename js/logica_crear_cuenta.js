// logica_crear_cuenta.js

// Usaremos localStorage para simular el almacenamiento de las cuentas
const XML_STORAGE_KEY = 'usuariosXMLData';
const XML_URL = 'crear_cuenta.xml';

/**
 * Función para manejar el envío del formulario y realizar validaciones.
 */
function manejarRegistro(event) {
    event.preventDefault(); 

    const form = document.getElementById('registroForm');
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const contrasena = document.getElementById('contrasena').value;
    const repetirContrasena = document.getElementById('repetirContrasena').value;

    // --- Validaciones Lado del Cliente ---
    
    if (contrasena.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (contrasena !== repetirContrasena) {
        alert("Las contraseñas no coinciden. Por favor, revísalas.");
        return;
    }
    
    // Asumiendo que las validaciones de 'required' y 'email' ya las maneja el HTML5.

    // 1. Cargar el XML (simulado)
    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // 2. Determinar el nuevo ID
    let ultimoId = 0;
    const usuariosExistentes = xmlDoc.getElementsByTagName('usuario');
    for (let i = 0; i < usuariosExistentes.length; i++) {
        const currentId = parseInt(usuariosExistentes[i].getAttribute('id'));
        if (currentId > ultimoId) {
            ultimoId = currentId;
        }
    }
    const nuevoId = ultimoId + 1;

    // 3. Crear el nuevo nodo <usuario> (XML)
    const nuevoUsuario = xmlDoc.createElement('usuario');
    nuevoUsuario.setAttribute('id', `u${nuevoId}`);

    const campos = { nombre, apellidos, email, telefono, direccion, contrasena }; // No guardes la contraseña sin cifrar en un sistema real.
    
    for (const key in campos) {
        const elem = xmlDoc.createElement(key);
        elem.textContent = campos[key];
        nuevoUsuario.appendChild(elem);
    }
    
    // 4. Añadir al nodo raíz <usuarios>
    const nodoUsuarios = xmlDoc.getElementsByTagName('usuarios')[0];
    if (nodoUsuarios) {
        nodoUsuarios.appendChild(nuevoUsuario);
    } else {
        alert("Error interno: No se encontró el nodo <usuarios> en el XML.");
        return;
    }

    // 5. Guardar el XML actualizado en localStorage
    const serializer = new XMLSerializer();
    const nuevoXmlString = serializer.serializeToString(xmlDoc);
    localStorage.setItem(XML_STORAGE_KEY, nuevoXmlString);
    
    alert(`¡Perfil creado con éxito! Bienvenido, ${nombre}.`);

    // 6. Limpiar el formulario
    form.reset();
    
    console.log("Nuevo usuario registrado:", { id: `u${nuevoId}`, email: email });
}

/**
 * Carga el XML base y adjunta el evento al formulario.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar localStorage si no existe (carga el XML base)
    if (!localStorage.getItem(XML_STORAGE_KEY)) {
        fetch(XML_URL)
            .then(response => response.text())
            .then(xmlText => {
                localStorage.setItem(XML_STORAGE_KEY, xmlText);
                console.log('XML de registro inicializado.');
            })
            .catch(error => console.error('Error al inicializar el XML base:', error));
    }
    
    // Adjuntar el evento al formulario
    const form = document.getElementById('registroForm');
    if (form) {
        form.addEventListener('submit', manejarRegistro);
    } else {
        // En caso de que el XSLT tarde en renderizar (aunque defer ayuda)
        console.warn("Formulario no encontrado inmediatamente. Usando observador.");
        new MutationObserver((mutationsList, observer) => {
            const formAfterXSLT = document.getElementById('registroForm');
            if (formAfterXSLT) {
                formAfterXSLT.addEventListener('submit', manejarRegistro);
                observer.disconnect();
            }
        }).observe(document.body, { childList: true, subtree: true });
    }
});