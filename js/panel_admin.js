document.addEventListener("DOMContentLoaded", () => {

    function agregarFilas(tableId, filas) {
        const tbody = document.querySelector(`#${tableId} tbody`);
        filas.forEach(fila => {
            const tr = document.createElement("tr");
            tr.innerHTML = fila;
            tbody.appendChild(tr);
        });
    }

    // --- Usuarios dinámicos ---
    const usuariosXML = localStorage.getItem("usuariosXMLData");
    if (usuariosXML) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(usuariosXML, "application/xml");
        const usuarios = xmlDoc.getElementsByTagName("usuario");
        const filas = [];
        for (let u of usuarios) {
            filas.push(`
                <td>${u.getAttribute("id")}</td>
                <td>${u.getElementsByTagName("nombre")[0]?.textContent || ''}</td>
                <td>${u.getElementsByTagName("apellidos")[0]?.textContent || ''}</td>
                <td>${u.getElementsByTagName("email")[0]?.textContent || ''}</td>
                <td>${u.getElementsByTagName("telefono")[0]?.textContent || ''}</td>
                <td>${u.getElementsByTagName("direccion")[0]?.textContent || ''}</td>
            `);
        }
        agregarFilas("usuarios-table", filas);
    }

    // --- Animales dinámicos ---
    const animales = JSON.parse(localStorage.getItem("animalesEnAdopcion") || "[]");
    const filasAnimales = animales.map(a => `
        <td>${a.id}</td>
        <td>${a.nombre}</td>
        <td>${a.especie || 'N/A'}</td>
        <td>${a.raza || 'N/A'}</td>
        <td>${a.edad || 'N/A'}</td>
        <td>${a.estado || 'N/A'}</td>
    `);
    agregarFilas("animales-table", filasAnimales);

    // --- Adopciones dinámicas ---
    const adopciones = JSON.parse(localStorage.getItem("adopcionesRegistro") || "[]");
    const filasAdopciones = adopciones.map((adop, index) => {
        const animal = animales.find(a => a.id === adop.id_animal) || {};
        return `
            <td>D-${index+1}</td>
            <td>${adop.fecha}</td>
            <td>${adop.animal_name}</td>
            <td>${animal.especie || 'N/A'} / ${animal.raza || 'N/A'}</td>
            <td>${adop.adoptante1} y ${adop.adoptante2}</td>
        `;
    });
    agregarFilas("adopciones-table", filasAdopciones);

    // --- Mensajes dinámicos ---
    const mensajes = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    const filasMensajes = mensajes.map(msg => `
        <td>${msg.nombre}</td>
        <td>${msg.email}</td>
        <td>${msg.mensaje}</td>
    `);
    agregarFilas("mensajes-table", filasMensajes);
});
