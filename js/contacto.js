document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Guardar mensaje en localStorage
        let mensajes = JSON.parse(localStorage.getItem("contactMessages") || "[]");
        mensajes.push({ nombre, email, mensaje });
        localStorage.setItem("contactMessages", JSON.stringify(mensajes));

        alert("Mensaje enviado correctamente y guardado.");
        form.reset();
    });
});
