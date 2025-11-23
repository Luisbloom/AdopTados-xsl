// Este script añade al final de la tabla todas las adopciones registradas en localStorage

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#adopciones-table tbody");
    if (!tbody) return;

    // Obtener adopciones dinámicas
    const adopcionesDinamicas = JSON.parse(localStorage.getItem("adopcionesRegistro") || "[]");
    const animales = JSON.parse(localStorage.getItem("animalesEnAdopcion") || "[]");

    adopcionesDinamicas.forEach((adopcion, index) => {
        // Buscar especie y raza del animal
        const animal = animales.find(a => a.id === adopcion.id_animal) || {};

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>D-${index + 1}</td>
            <td>${adopcion.fecha}</td>
            <td>${adopcion.animal_name}</td>
            <td>${animal.especie || 'N/A'} / ${animal.raza || 'N/A'}</td>
            <td>${adopcion.adoptante1} y ${adopcion.adoptante2}</td>
        `;
        tbody.appendChild(tr);
    });
});
