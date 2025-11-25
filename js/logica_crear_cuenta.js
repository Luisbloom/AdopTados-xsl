const XML_STORAGE_KEY = 'usuariosXMLData'; 
const REDIRECT_URL = 'iniciar_sesion.xml'; 

/**
 * Maneja el envío del formulario y guarda el usuario en LocalStorage
 */
function manejarRegistro(event) {
    event.preventDefault(); 

    const form = document.getElementById('registroForm');
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const contrasena = document.getElementById('contrasena').value;
    const repetirContrasena = document.getElementById('repetirContrasena').value;

    if (contrasena !== repetirContrasena) {
        alert("Las contraseñas no coinciden. Por favor, revísalas.");
        return;
    }

    // Cargar XML desde localStorage
    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    const parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    // Determinar el nuevo ID (u1, u2, u3...)
    let ultimoId = 0;
    const usuariosExistentes = xmlDoc.getElementsByTagName('usuario'); 
    for (let i = 0; i < usuariosExistentes.length; i++) {
        const currentId = parseInt(usuariosExistentes[i].getAttribute('id').replace('u', '')) || 0;
        if (currentId > ultimoId) {
            ultimoId = currentId;
        }
    }
    const nuevoId = ultimoId + 1;

    // Crear el nodo <usuario>
    const nuevoUsuario = xmlDoc.createElement('usuario');
    nuevoUsuario.setAttribute('id', `u${nuevoId}`);

    const campos = { nombre, apellidos, email, telefono, direccion, contrasena };
    for (const key in campos) {
        const elem = xmlDoc.createElement(key);
        elem.textContent = campos[key];
        nuevoUsuario.appendChild(elem);
    }

    // Añadir al nodo contenedor <usuarios>
    let nodoUsuarios = xmlDoc.getElementsByTagName('usuarios')[0];
    if (!nodoUsuarios) {
        nodoUsuarios = xmlDoc.documentElement; 
    }
    nodoUsuarios.appendChild(nuevoUsuario);

    // Guardar XML actualizado en LocalStorage
    const serializer = new XMLSerializer();
    const nuevoXmlString = serializer.serializeToString(xmlDoc);
    localStorage.setItem(XML_STORAGE_KEY, nuevoXmlString);
    
    alert(`¡Perfil creado y guardado! ID: u${nuevoId}. Redirigiendo a inicio de sesión.`);
    form.reset();
    window.location.href = REDIRECT_URL;
}

/**
 * Inicializa LocalStorage con XML base si no existe.
 * Esto elimina la dependencia de fetch y funciona en cualquier PC
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem(XML_STORAGE_KEY)) {
        const xmlBase = `
            <registro_usuario>
                <usuarios/>
            </registro_usuario>
        `;
        localStorage.setItem(XML_STORAGE_KEY, xmlBase);
    }

    // Observador para el formulario después de XSLT
    const observer = new MutationObserver(() => {
        const formAfterXSLT = document.getElementById('registroForm');
        if (formAfterXSLT) {
            formAfterXSLT.addEventListener('submit', manejarRegistro);
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
