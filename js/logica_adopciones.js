// logica_adopciones.js

const XML_STORAGE_KEY = 'usuariosXMLData'; 
const ADOPTIONS_STORAGE_KEY = 'adopcionesRegistro'; 
const ANIMAL_STORAGE_KEY = 'animalesEnAdopcion'; 
const REDIRECT_URL = 'perfil_personal.xml'; 

// --- LISTA DE ANIMALES PREDETERMINADOS (ESTÁTICOS) ---
// Ahora solo actúa como fuente inicial de datos.
const PREDETERMINED_ANIMALS = [
    { id: 'P001', nombre: 'Luna', especie: 'Perro', raza: 'Labrador', estado: 'Disponible' },
    { id: 'P002', nombre: 'Milo', especie: 'Gato', raza: 'Siamés', estado: 'Disponible' },
    { id: 'P003', nombre: 'Coco', especie: 'Perro', raza: 'Poodle', estado: 'Disponible' },
    { id: 'P004', nombre: 'Bigotes', especie: 'Gato', raza: 'Común Europeo', estado: 'Disponible' },
];

/**
 * Carga los animales predefinidos en localStorage si es la primera vez.
 */
function initializeAnimalData() {
    let animalesDinamicos = JSON.parse(localStorage.getItem(ANIMAL_STORAGE_KEY) || '[]');
    
    // Si la lista de animales dinámicos está vacía, la poblamos con los predefinidos.
    // Usamos un ID inicial 'P' para predefinidos y 'A' para registrados por usuarios.
    // Esto solo se ejecuta la primera vez que el navegador accede a la lista.
    if (animalesDinamicos.length === 0) {
        // Clonamos para evitar modificar la constante original
        const initializedAnimals = PREDETERMINED_ANIMALS.map(animal => ({
            ...animal,
            // Añadimos una fecha de registro inicial si es necesario
            fechaRegistro: new Date().toLocaleDateString('es-ES') 
        }));
        
        localStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(initializedAnimals));
        console.log("DEBUG: Animales predefinidos cargados en localStorage.");
        animalesDinamicos = initializedAnimals;
    }
    return animalesDinamicos;
}


/**
 * Busca un usuario en el XML de localStorage por email.
 */
function findUserByEmail(email, xmlDoc) {
    const xpath = `//usuario[email='${email}']`;
    const userNode = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
    if (!userNode) return null;
    
    const data = { id: userNode.getAttribute('id') };
    const children = userNode.children;
    for (let i = 0; i < children.length; i++) {
        data[children[i].tagName] = children[i].textContent;
    }
    return data;
}

/**
 * Rellena el desplegable de selección de animal usando la lista unificada de localStorage.
 */
function renderAnimalOptions() {
    const selectElement = document.getElementById('animal-select');
    if (!selectElement) return;

    // 1. Inicializar y obtener la lista unificada de animales de localStorage
    const todosLosAnimales = initializeAnimalData();

    // 2. Limpiar opciones existentes
    selectElement.innerHTML = '<option value="">— Selecciona Animal a Adoptar —</option>';
    
    // 3. Generar nuevas opciones a partir de la lista
    let animalesDisponibles = 0;
    
    todosLosAnimales.forEach(animal => {
        // Solo mostramos aquellos cuyo estado sea 'Disponible'
        if (animal.estado === 'Disponible') { 
            const option = document.createElement('option');
            option.value = animal.id; 
            option.textContent = `${animal.nombre} (${animal.especie} / ${animal.raza || 'Sin raza'})`;
            selectElement.appendChild(option);
            animalesDisponibles++;
        }
    });

    if (animalesDisponibles === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay animales disponibles para adopción.';
        option.disabled = true;
        selectElement.appendChild(option);
    }
}


/**
 * Maneja el envío del formulario de adopción y actualiza el estado del animal.
 */
function handleAdoptionSubmit(event) {
    event.preventDefault(); 

    // 1. Obtener valores y validaciones
    const animalSelect = document.getElementById('animal-select'); 
    const animalId = animalSelect.value;
    const animalName = animalSelect.options[animalSelect.selectedIndex].text; 
    const email1 = document.getElementById('email1').value.trim();
    const email2 = document.getElementById('email2').value.trim();
    
    if (animalId === "") {
        alert("Por favor, selecciona un animal.");
        return;
    }
    if (email1 === email2) {
        alert("Los correos de los dos adoptantes deben ser diferentes.");
        return;
    }

    // 2. Cargar XML de usuarios (Validación de usuarios)
    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    if (!xmlString) {
        alert("Error: No se encontró la base de datos de usuarios.");
        return;
    }
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const adoptante1 = findUserByEmail(email1, xmlDoc);
    const adoptante2 = findUserByEmail(email2, xmlDoc);

    if (!adoptante1 || !adoptante2) {
        alert("Error: Uno o ambos adoptantes no están registrados.");
        return;
    }

    // 3. Crear y registrar la nueva adopción
    const nuevaAdopcion = {
        adoptante1Id: adoptante1.id,
        adoptante2Id: adoptante2.id,
        id_pareja: `${adoptante1.id}-${adoptante2.id}`, 
        
        id_animal: animalId,
        animal_name: animalName.split('(')[0].trim(),
        fecha: new Date().toLocaleDateString('es-ES'),
        adoptante1: adoptante1.nombre,
        adoptante2: adoptante2.nombre,
    };

    let registroAdopciones = JSON.parse(localStorage.getItem(ADOPTIONS_STORAGE_KEY) || '[]');
    registroAdopciones.push(nuevaAdopcion);
    localStorage.setItem(ADOPTIONS_STORAGE_KEY, JSON.stringify(registroAdopciones));
    
    // ===============================================
    // 🌟 4. CAMBIAR EL ESTADO DEL ANIMAL (Aplica a Predefinidos y Registrados) 🌟
    // ===============================================
    let animalesDinamicos = JSON.parse(localStorage.getItem(ANIMAL_STORAGE_KEY) || '[]');
    
    const animalIndex = animalesDinamicos.findIndex(a => a.id === animalId);

    if (animalIndex !== -1) {
        // El animal es encontrado en la lista unificada (ya sea P00X o AXX)
        animalesDinamicos[animalIndex].estado = 'Adoptado';
        localStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(animalesDinamicos));
        console.log(`Animal ${animalId} marcado como Adoptado.`);
    } else {
        console.error(`ERROR: Animal ${animalId} no encontrado en la lista unificada de LocalStorage para actualizar su estado.`);
    }

    alert(`🎉 Solicitud de adopción conjunta para ${nuevaAdopcion.animal_name} registrada.`);

    // 5. Redirección
    event.target.reset(); 
    window.location.href = REDIRECT_URL; 
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    // Usamos MutationObserver para garantizar que el formulario exista antes de renderizar
    const observer = new MutationObserver((mutationsList, observer) => {
        const form = document.getElementById('adoptionForm');
        if (form) {
            initializeAnimalData(); // Aseguramos que los animales estáticos están cargados
            renderAnimalOptions(); 
            form.addEventListener('submit', handleAdoptionSubmit);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});