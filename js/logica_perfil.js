// logica_perfil.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const LOGGED_IN_USER_KEY = 'loggedInUser';
const ADOPTIONS_STORAGE_KEY = 'adopcionesRegistro'; 
const ANIMAL_STORAGE_KEY = 'animalesEnAdopcion'; 
const LOGOUT_URL = 'iniciar_sesion.xml';

// --- Constantes para Imágenes Aleatorias (Asegúrate que las imágenes están en la carpeta 'img/') ---
const ANIMAL_IMAGES = {
    'perro': ['perro1.webp', 'perro2.avif', 'perro3.jpeg', 'perro4.png', 'perro5.jpeg', 'perro6.webp'],
    'gato': ['gato1.jpg', 'gato2.jpg', 'gato3.avif', 'gato4.jpg'],
    'conejo': ['conejo1.jpg', 'conejo2.webp', 'conejo3.webp'],
    'default': ['perro4.png'] 
};

// --- LISTA DE ANIMALES PREDETERMINADOS (ESTÁTICOS) ---
const PREDETERMINED_ANIMALS = [
    { id: 'P001', nombre: 'Luna', especie: 'Perro', raza: 'Labrador', estado: 'Disponible', peso: 30, altura: 60, descripcion: 'Juguetona y amigable, necesita mucho espacio.', edad: 4 },
    { id: 'P002', nombre: 'Milo', especie: 'Gato', raza: 'Siamés', estado: 'Disponible', peso: 5, altura: 30, descripcion: 'Muy vocal, cariñoso y le gusta la comida húmeda.', edad: 2 },
];


/**
 * Función auxiliar para obtener la imagen aleatoria basada en la especie.
 */
function getRandomAnimalImage(animalName) {
    const nameLower = animalName.toLowerCase();
    let speciesKey = 'default';

    if (nameLower.includes('perro')) {
        speciesKey = 'perro';
    } else if (nameLower.includes('gato')) {
        speciesKey = 'gato';
    } else if (nameLower.includes('conejo')) {
        speciesKey = 'conejo';
    }
    
    const imageArray = ANIMAL_IMAGES[speciesKey] || ANIMAL_IMAGES['default'];
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return `img/${imageArray[randomIndex]}`;
}


/**
 * Muestra el modal con los detalles completos del animal.
 */
function showAnimalDetails(animalId) {
    const animalesDinamicosJSON = localStorage.getItem(ANIMAL_STORAGE_KEY);
    const animalesDinamicos = JSON.parse(animalesDinamicosJSON || '[]');
    
    // Combinar animales
    const todosLosAnimales = [...PREDETERMINED_ANIMALS, ...animalesDinamicos];
    let animal = todosLosAnimales.find(a => a.id === animalId); 
    
    if (!animal) {
        alert(`Error: No se encontraron los detalles completos del animal con ID ${animalId}.`);
        return;
    }

    const modalContent = document.getElementById('modal-body-content');
    const modalTitle = document.getElementById('modal-title');
    const modal = document.getElementById('animal-details-modal');

    modalTitle.textContent = `Detalles de ${animal.nombre} (${animal.id})`;

    modalContent.innerHTML = `
        <p><strong>Especie:</strong> ${animal.especie}</p>
        <p><strong>Raza:</strong> ${animal.raza || 'N/A'}</p>
        <p><strong>Edad:</strong> ${animal.edad || 'N/A'} años</p>
        <p><strong>Peso:</strong> ${animal.peso || 'N/A'} kg</p>
        <p><strong>Altura:</strong> ${animal.altura || 'N/A'} cm</p>
        <p style="margin-top: 15px;"><strong>Descripción y Cuidados:</strong></p>
        <p style="padding-left: 15px; font-style: italic;">${animal.descripcion}</p>
        <p style="font-size: 0.9em; color: #888; margin-top: 15px;">Fecha Registro: ${animal.fechaRegistro || 'N/A'}</p>
    `;

    modal.style.display = "block";
}

/**
 * Función para cerrar el modal.
 */
function closeModal() {
    const modal = document.getElementById('animal-details-modal');
    if (modal) {
        modal.style.display = "none";
    }
}


// --- Funciones de Datos y Renderizado (RESTO DEL PERFIL) ---

function getUserData(userId, xmlDoc) {
    const xpath = `//usuario[@id='${userId}']`;
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

function renderDatosPersonales(userData) {
    const placeholder = document.getElementById('datos-personales-placeholder');
    if (!placeholder) return;

    const userInfo = document.getElementById('user-info-placeholder');
    if (userInfo) {
        userInfo.innerHTML = `Bienvenido/a, ${userData.nombre || ''} ${userData.apellidos || ''} (ID: ${userData.id})`;
    }
    
    const html = `
        <p><strong>Email:</strong> ${userData.email || 'N/A'}</p>
        <p><strong>Teléfono:</strong> ${userData.telefono || 'N/A'}</p>
        <p><strong>Dirección:</strong> ${userData.direccion || 'N/A'}</p>
    `;
    placeholder.innerHTML = html;
}

/**
 * Renderiza la sección de Adopciones.
 */
function renderAdopciones(userId) {
    const placeholder = document.getElementById('adopciones-placeholder');
    if (!placeholder) return;
    
    const registroAdopcionesJSON = localStorage.getItem(ADOPTIONS_STORAGE_KEY);
    const registroAdopciones = JSON.parse(registroAdopcionesJSON || '[]');

    const adopcionesDelUsuario = registroAdopciones.filter(adopcion => {
        return adopcion.id_pareja && adopcion.id_pareja.includes(userId);
    });

    if (adopcionesDelUsuario.length === 0) {
        placeholder.innerHTML = '<p class="no-adoptions">No tienes adopciones registradas.</p>';
        return;
    }

    let html = '';
    adopcionesDelUsuario.forEach(adopcion => {
        const otroId = adopcion.id_pareja.replace(userId, '').replace('-', '');
        const coadoptante = (adopcion.adoptante1Id === userId) ? adopcion.adoptante2 : adopcion.adoptante1;
        
        // Obtener la imagen aleatoria basada en el nombre del animal (contiene especie)
        const imagenUrl = getRandomAnimalImage(adopcion.animal_name || ''); 

        html += `
            <div class="adoption-card-simple">
                <div class="adoption-image-wrapper">
                    <img src="${imagenUrl}" alt="Animal adoptado">
                </div>
                <div class="adoption-card-content">
                    <h4>Animal Solicitado: ${adopcion.animal_name || 'N/A'}</h4> 
                    <p><strong>ID del Animal:</strong> ${adopcion.id_animal}</p>
                    <p><strong>Fecha de Solicitud:</strong> ${adopcion.fecha}</p>
                    <p><strong>Coadoptante:</strong> ${coadoptante} (ID: ${otroId})</p>
                    
                    <button 
                        class="details-button" 
                        onclick="window.showAnimalDetails('${adopcion.id_animal}')">
                        Ver Detalles
                    </button>
                </div>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;">
        `;
    });
    
    placeholder.innerHTML = html;
}


function deleteUserAccount() {
    // ... (Mantener la función de eliminación)
}

function loadAndRenderProfile() {
    const loggedInUser = sessionStorage.getItem(LOGGED_IN_USER_KEY);
    const mainContainer = document.querySelector('.main-container');

    console.log("DEBUG: ID de usuario en sesión:", loggedInUser); 

    if (!loggedInUser) {
        console.error("ERROR: No hay sesión activa. Mostrando mensaje de acceso denegado.");
        if (mainContainer) {
             mainContainer.innerHTML = `
                <h2 style="color: #cc0000; text-align: center; margin-top: 50px;">
                    🚫 Acceso Denegado. Por favor, <a href="${LOGOUT_URL}">inicia sesión</a>.
                </h2>
            `;
        }
        return;
    }

    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    
    if (!xmlString) {
        console.error("ERROR: No se encontraron datos de registro (usuariosXMLData).");
        sessionStorage.removeItem(LOGGED_IN_USER_KEY);
         if (mainContainer) {
             mainContainer.innerHTML = `
                <h2 style="color: #cc0000; text-align: center; margin-top: 50px;">
                    ❌ Error de Datos. Base de datos no encontrada.
                </h2>
            `;
         }
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    
    const userData = getUserData(loggedInUser, xmlDoc);

    if (!userData) {
        console.error(`ERROR: No se encontraron datos para el ID ${loggedInUser}. Sesión inválida.`);
        sessionStorage.removeItem(LOGGED_IN_USER_KEY);
         if (mainContainer) {
             mainContainer.innerHTML = `
                <h2 style="color: #cc0000; text-align: center; margin-top: 50px;">
                    🕵️ Usuario no encontrado. Sesión caducada.
                </h2>
                <p style="text-align: center;">
                    <a href="${LOGOUT_URL}">Volver a Iniciar Sesión</a>
                </p>
            `;
         }
        return;
    }
    
    console.log("DEBUG: Datos de usuario cargados con éxito:", userData);
    
    renderDatosPersonales(userData);
    renderAdopciones(userData.id);
}

function setupLogoutButton() {
    const logoutBtn = document.getElementById('cerrar-sesion-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem(LOGGED_IN_USER_KEY);
            alert("Has cerrado tu sesión.");
            window.location.href = logoutBtn.getAttribute('href'); 
        });
    }
}

function setupDeleteAccountButton() {
    const deleteBtn = document.getElementById('borrar-cuenta-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            deleteUserAccount();
        });
    }
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Exponer funciones globales
    window.showAnimalDetails = showAnimalDetails; 
    window.closeModal = closeModal; 

    // Lógica para cerrar el modal al hacer clic fuera
    window.onclick = function(event) {
        const modal = document.getElementById('animal-details-modal');
        if (modal && event.target == modal) {
            closeModal();
        }
    }

    // Usamos MutationObserver para asegurar que el contenido XSLT ya se cargó
    const observer = new MutationObserver((mutationsList, observer) => {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            loadAndRenderProfile();
            setupLogoutButton();
            setupDeleteAccountButton(); 
            observer.disconnect();
        }
    });
    // Observar el cuerpo para detectar la inyección de la estructura del perfil
    observer.observe(document.body, { childList: true, subtree: true });
});