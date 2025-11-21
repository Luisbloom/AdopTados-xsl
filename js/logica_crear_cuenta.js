// logica_crear_cuenta.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const XML_URL = 'crear_cuenta.xml'; 
const REDIRECT_URL = 'iniciar_sesion.xml'; 

/**
 * Función para manejar el envío del formulario y almacenar el nuevo usuario.
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

    if (contrasena !== repetirContrasena) {
        alert("Las contraseñas no coinciden. Por favor, revísalas.");
        return;
    }
    
    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // 1. Determinar el nuevo ID (u1, u2, u3...)
    let ultimoId = 0;
    const usuariosExistentes = xmlDoc.getElementsByTagName('usuario'); 
    for (let i = 0; i < usuariosExistentes.length; i++) {
        const currentId = parseInt(usuariosExistentes[i].getAttribute('id').replace('u', '')) || 0;
        if (currentId > ultimoId) {
            ultimoId = currentId;
        }
    }
    const nuevoId = ultimoId + 1;

    // 2. Crear el nuevo nodo <usuario> (XML)
    const nuevoUsuario = xmlDoc.createElement('usuario');
    nuevoUsuario.setAttribute('id', `u${nuevoId}`);

    const campos = { nombre, apellidos, email, telefono, direccion, contrasena };
    
    for (const key in campos) {
        const elem = xmlDoc.createElement(key);
        elem.textContent = campos[key];
        nuevoUsuario.appendChild(elem);
    }
    
    // 3. Añadir al nodo contenedor (<usuarios> o la raíz)
    let nodoUsuarios = xmlDoc.getElementsByTagName('usuarios')[0];
    
    if (!nodoUsuarios) {
        nodoUsuarios = xmlDoc.documentElement; 
    }
    
    nodoUsuarios.appendChild(nuevoUsuario);

    // 4. Guardar el XML actualizado
    const serializer = new XMLSerializer();
    const nuevoXmlString = serializer.serializeToString(xmlDoc);
    localStorage.setItem(XML_STORAGE_KEY, nuevoXmlString);
    
    alert(`¡Perfil creado y guardado! ID: u${nuevoId}. Redirigiendo a inicio de sesión.`);

    form.reset();
    window.location.href = REDIRECT_URL;
}

/**
 * Carga el XML base si no está en localStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem(XML_STORAGE_KEY)) {
        fetch(XML_URL)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(xmlText => {
                localStorage.setItem(XML_STORAGE_KEY, xmlText);
            })
            .catch(error => console.error('Error al inicializar el XML base:', error));
    }
    
    const observer = new MutationObserver((mutationsList, observer) => {
        const formAfterXSLT = document.getElementById('registroForm');
        if (formAfterXSLT) {
            formAfterXSLT.addEventListener('submit', manejarRegistro);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});