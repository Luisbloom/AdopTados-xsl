// logica_adopciones.js

// --- CONSTANTES ---
const XML_STORAGE_KEY = 'adopcionesXMLData';
const XML_URL = 'adopciones.xml'; 
const XSL_URL = 'template_adopciones.xsl';
const CONTENEDOR_ID = 'listaAdopciones'; // El ID de la sección que contiene la tabla

// --- FUNCIÓN CENTRAL DE TRANSFORMACIÓN ---

/**
 * Aplica la transformación XSLT al documento XML dado y actualiza el contenido de la tabla.
 * @param {Document} xmlDoc - El objeto Documento XML (con o sin las nuevas adopciones).
 * @param {string} xslUrl - URL del archivo XSLT.
 * @param {string} contenedorId - ID del elemento que contiene la tabla en el HTML generado.
 */
function transformarYMostrar(xmlDoc, xslUrl, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) {
        console.error(`Contenedor con ID '${contenedorId}' no encontrado.`);
        return;
    }

    fetch(xslUrl)
        .then(response => response.text())
        .then(xslText => {
            const parser = new DOMParser();
            const xslDoc = parser.parseFromString(xslText, 'application/xml');
            
            if (typeof XSLTProcessor !== 'undefined') {
                const xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xslDoc);
                
                // Transforma el documento XML completo en un nuevo documento HTML
                const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
                
                // Extrae SOLO el contenido de la sección que queremos actualizar
                const updatedSection = resultDoc.getElementById(contenedorId);

                if (updatedSection) {
                    // Reemplaza el contenido de la sección de la tabla en el documento principal
                    contenedor.innerHTML = updatedSection.innerHTML;
                    contenedor.querySelector('h2').textContent = 'Adopciones Registradas (Datos Actualizados)';
                } else {
                    console.error("La sección de la tabla no se encontró en el documento transformado.");
                }
            } else {
                contenedor.innerHTML = '<p>Tu navegador no soporta XSLTProcessor para actualizaciones dinámicas.</p>';
            }
        })
        .catch(error => console.error('Error durante la transformación XSL:', error));
}


// --- LÓGICA DE CARGA INICIAL ---

/**
 * Carga el XML inicial (o desde localStorage) y prepara la aplicación.
 */
function cargarYPrepararApp() {
    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    
    if (xmlString) {
        // Cargar desde localStorage (Datos persistentes simulados)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
        console.log('XML cargado desde localStorage. Transformando...');
        
        // Llamar a la transformación para asegurar que la tabla actualizada se muestre
        transformarYMostrar(xmlDoc, XSL_URL, CONTENEDOR_ID);
        
    } else {
        // Cargar desde el archivo estático la primera vez
        fetch(XML_URL)
            .then(response => response.text())
            .then(xmlText => {
                localStorage.setItem(XML_STORAGE_KEY, xmlText); // Guardar el original
                console.log('XML cargado desde archivo estático e inicializado en localStorage.');
                // La transformación inicial la hace el navegador por el <?xml-stylesheet?>
            })
            .catch(error => {
                console.error('Error cargando XML inicial:', error);
                document.getElementById(CONTENEDOR_ID).innerHTML = '<p>Error al cargar el archivo XML estático.</p>';
            });
    }
}


// --- MANEJO DEL REGISTRO ---

/**
 * Maneja el envío del formulario, valida, añade el nodo XML y actualiza la vista.
 */
function manejarRegistro(event) {
    event.preventDefault(); 

    const id_pareja = document.getElementById('id_pareja').value.trim();
    const id_animal = document.getElementById('id_animal').value.trim();
    const fecha = document.getElementById('fecha').value.trim();

    if (!id_pareja || !id_animal || !fecha) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const xmlString = localStorage.getItem(XML_STORAGE_KEY);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    
    // 1. Validación (Busca si los IDs existen en el XML)
    // Nota: El uso de XPath es más avanzado y seguro para validación.
    const parejaExiste = xmlDoc.evaluate(`//Pareja[@id='${id_pareja}']`, xmlDoc, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
    const animalExiste = xmlDoc.evaluate(`//Animal[@id='${id_animal}']`, xmlDoc, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;

    if (!parejaExiste) {
        alert(`Error: La Pareja con ID '${id_pareja}' no existe en el registro.`);
        return;
    }
    if (!animalExiste) {
        alert(`Error: El Animal con ID '${id_animal}' no existe en el registro.`);
        return;
    }
    
    // 2. Crear y añadir los nuevos nodos XML
    const nuevaAdopcion = xmlDoc.createElement('Adopcion');

    const animalRef = xmlDoc.createElement('AnimalRef');
    animalRef.setAttribute('id_animal', id_animal);

    const parejaRef = xmlDoc.createElement('ParejaRef');
    parejaRef.setAttribute('id_pareja', id_pareja);

    const fechaAdopcion = xmlDoc.createElement('FechaAdopcion');
    fechaAdopcion.textContent = fecha;

    nuevaAdopcion.appendChild(animalRef);
    nuevaAdopcion.appendChild(parejaRef);
    nuevaAdopcion.appendChild(fechaAdopcion);

    const nodoAdopciones = xmlDoc.getElementsByTagName('Adopciones')[0];
    if (nodoAdopciones) {
        nodoAdopciones.appendChild(nuevaAdopcion);
    } else {
        alert("Error interno: No se encontró el nodo <Adopciones> para guardar el registro.");
        return;
    }

    // 3. Guardar el XML actualizado en localStorage
    const serializer = new XMLSerializer();
    const nuevoXmlString = serializer.serializeToString(xmlDoc);
    localStorage.setItem(XML_STORAGE_KEY, nuevoXmlString);
    
    alert(`¡Adopción registrada con éxito! La lista se ha actualizado.`);

    // 4. Recargar y mostrar la lista de adopciones actualizada
    transformarYMostrar(xmlDoc, XSL_URL, CONTENEDOR_ID);

    // 5. Limpiar el formulario
    document.getElementById('formularioRegistro').reset();
}


// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
    cargarYPrepararApp(); 

    // Adjuntar el manejador de eventos al formulario después de que el XSLT lo haya creado.
    // Usamos MutationObserver como respaldo, aunque 'defer' debería ser suficiente.
    const observer = new MutationObserver((mutationsList, observer) => {
        const form = document.getElementById('formularioRegistro');
        if (form) {
            form.addEventListener('submit', manejarRegistro);
            observer.disconnect(); // Detener el observador una vez encontrado
        }
    });
    // Observar el cuerpo del documento en busca de cambios en sub-árboles (donde estará el formulario)
    observer.observe(document.body, { childList: true, subtree: true });
});