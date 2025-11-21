// logica_registro_animal.js

const ANIMAL_STORAGE_KEY = 'animalesEnAdopcion'; 
const REDIRECT_URL = 'perfil_personal.xml';

// --- LISTA DE ANIMALES PREDETERMINADOS (Fuente de datos inicial) ---
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
    
    // Solo inicializamos si la lista está vacía
    if (animalesDinamicos.length === 0) {
        const initializedAnimals = PREDETERMINED_ANIMALS.map(animal => ({
            ...animal,
            fechaRegistro: new Date().toLocaleDateString('es-ES') 
        }));
        
        localStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(initializedAnimals));
        console.log("DEBUG: Animales predefinidos cargados en localStorage.");
    }
}

/**
 * Genera un ID secuencial para animales registrados por usuarios (A1, A2, etc.)
 */
function generateAnimalId(currentRecords) {
    const userRegisteredAnimals = currentRecords.filter(a => a.id.startsWith('A'));
    const lastIdNumber = userRegisteredAnimals.length > 0 
        ? Math.max(...userRegisteredAnimals.map(a => parseInt(a.id.replace('A', '') || 0)))
        : 0;
        
    return 'A' + (lastIdNumber + 1);
}

/**
 * Muestra u oculta el campo de texto "Especificar Otro"
 */
function mostrarCampoOtro() {
    const especieSelect = document.getElementById('especie_animal');
    const otroContainer = document.getElementById('otro_especie_container');
    const otroInput = document.getElementById('otra_especie_input');

    if (especieSelect && otroContainer && otroInput) {
        if (especieSelect.value === 'otro') {
            otroContainer.style.display = 'block';
            otroInput.required = true; 
        } else {
            otroContainer.style.display = 'none';
            otroInput.required = false;
            otroInput.value = ''; 
        }
    }
}

/**
 * Maneja el envío del formulario de registro de animal.
 */
function handleAnimalRegistration(event) {
    event.preventDefault(); 
    console.log("DEBUG: Formulario de registro de animal enviado.");

    // ===============================================
    // 🌟 ZONA CRÍTICA CORREGIDA: Obtención de Valores Defensiva 🌟
    // ===============================================
    
    // Función auxiliar para obtener el valor de forma segura
    const getValue = (id, trim = true) => {
        const element = document.getElementById(id);
        if (!element) {
             console.warn(`WARN: Elemento con ID '${id}' no encontrado en el DOM.`);
             return ''; // Devuelve cadena vacía si el elemento falta
        }
        const value = element.value || '';
        return trim ? value.trim() : value;
    };

    const nombre = getValue('nombre_animal');
    const especieSelect = document.getElementById('especie_animal'); // Este debe ser el elemento completo
    const otraEspecieInput = getValue('otra_especie_input');
    
    const raza = getValue('raza_animal');
    const edad = getValue('edad_animal', false); // No aplicar trim a números
    
    const peso = getValue('peso_animal', false);
    const altura = getValue('altura_animal', false);

    const descripcion = getValue('descripcion_animal');
    
    // ===============================================
    
    // 1. Determinar el valor final de la especie
    let especie;
    if (especieSelect && especieSelect.value === 'otro') {
        especie = otraEspecieInput;
    } else if (especieSelect) {
        especie = especieSelect.value;
    } else {
        especie = ''; // Falla si el select no existe
    }


    // 2. Validaciones
    if (!nombre || !especie || !edad || !descripcion) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }
    
    // 3. Cargar registro existente y generar ID
    let registroAnimales = JSON.parse(localStorage.getItem(ANIMAL_STORAGE_KEY) || '[]');
    const idAnimal = generateAnimalId(registroAnimales);

    // 4. Crear objeto del nuevo animal
    const nuevoAnimal = {
        id: idAnimal,
        nombre: nombre,
        especie: especie, 
        raza: raza,
        edad: edad,
        peso: peso || 'N/A',       
        altura: altura || 'N/A',   
        descripcion: descripcion,
        fechaRegistro: new Date().toLocaleDateString('es-ES'),
        estado: 'Disponible',
    };
    
    // 5. Guardar en localStorage
    registroAnimales.push(nuevoAnimal);
    localStorage.setItem(ANIMAL_STORAGE_KEY, JSON.stringify(registroAnimales));
    
    alert(`🎉 ¡Animal registrado! ${nombre} (${idAnimal}, ${especie}) está ahora disponible para adopción.`);

    // 6. Redirección
    event.target.reset(); 
    window.location.href = REDIRECT_URL; 
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    window.mostrarCampoOtro = mostrarCampoOtro; 
    
    // Usamos un pequeño retraso para asegurar que la transformación XSLT haya terminado
    setTimeout(() => {
        const form = document.getElementById('registroAnimalForm');
        const especieSelect = document.getElementById('especie_animal');

        if (form) {
            console.log("DEBUG: Formulario 'registroAnimalForm' encontrado. Adjuntando listener.");
            
            initializeAnimalData(); 
            
            // ADJUNTAR EL MANEJADOR DE ENVÍO
            form.addEventListener('submit', handleAnimalRegistration);
            
            // Inicializar el estado del campo 'otro'
            mostrarCampoOtro(); 
        } else {
            console.error("ERROR: Formulario 'registroAnimalForm' no encontrado. Asegúrese que el XSLT tiene el ID correcto.");
        }

        if (especieSelect) {
            // ADJUNTAR LISTENER AL SELECT DE ESPECIE
            especieSelect.addEventListener('change', mostrarCampoOtro);
        }
        
    }, 50); 
});