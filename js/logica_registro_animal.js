// js/logica_registro_animal.js

const ANIMAL_STORAGE_KEY = 'animalesEnAdopcion'; 
const REDIRECT_URL = 'perfil_personal.xml';

/**
 * Genera un ID simple para el animal (ej: A1, A2, etc.)
 */
function generateAnimalId(currentRecords) {
    const lastId = currentRecords.length > 0 ? parseInt(currentRecords[currentRecords.length - 1].id.replace('A', '')) : 0;
    return 'A' + (lastId + 1);
}

/**
 * Muestra u oculta el campo de texto "Especificar Otro"
 * basado en la selección del desplegable de especie.
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

    // 1. Obtener valores del formulario
    const nombre = document.getElementById('nombre_animal').value.trim();
    const especieSelect = document.getElementById('especie_animal');
    const otraEspecieInput = document.getElementById('otra_especie_input').value.trim();
    
    const raza = document.getElementById('raza_animal').value.trim();
    const edad = document.getElementById('edad_animal').value;
    
    const peso = document.getElementById('peso_animal').value;
    const altura = document.getElementById('altura_animal').value;

    const descripcion = document.getElementById('descripcion_animal').value.trim();

    // Determinar el valor final de la especie
    let especie;
    if (especieSelect.value === 'otro') {
        especie = otraEspecieInput;
    } else {
        especie = especieSelect.value;
    }

    // 2. Validaciones simples
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
    
    const observer = new MutationObserver((mutationsList, observer) => {
        const form = document.getElementById('registroAnimalForm');
        if (form) {
            form.addEventListener('submit', handleAnimalRegistration);
            mostrarCampoOtro(); 
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Asignar el listener al select de especie si ya está presente
    const especieSelect = document.getElementById('especie_animal');
    if(especieSelect) {
        especieSelect.addEventListener('change', mostrarCampoOtro);
    }
});