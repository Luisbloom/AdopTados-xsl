document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("animal-list");

    let animalesExtra = JSON.parse(localStorage.getItem("animalesEnAdopcion") || "[]");

    animalesExtra.forEach(animal => {
        const card = document.createElement("div");
        card.className = "animal-card";

        card.innerHTML = `
            <div class="card-body">
                <h3>${animal.nombre}</h3>
                <p><strong>Especie:</strong> ${animal.especie || 'No especificado'}</p>
                <p><strong>Raza:</strong> ${animal.raza || 'No especificado'}</p>
                <p><strong>Edad:</strong> ${animal.edad || 'N/A'}</p>
                <p><strong>ID:</strong> ${animal.id}</p>
            </div>
        `;

        container.appendChild(card);
    });
});
