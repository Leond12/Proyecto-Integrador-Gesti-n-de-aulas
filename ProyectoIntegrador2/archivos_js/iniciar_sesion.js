document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    const loginButton = document.querySelector("button");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        let usuario = document.getElementById("usuario").value.trim();
        let contrasena = document.getElementById("contrasena").value.trim();

        if (usuario === "" || contrasena === "") {
            showMessage("Por favor, complete todos los campos.", "alert-danger");
            return;
        }

        let formData = new FormData();
        formData.append("usuario", usuario);
        formData.append("contrasena", contrasena);

        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/iniciar_sesion.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // ✅ Guardar ID, nombre y rol del usuario
                localStorage.setItem("usuarioId", data.id); // ID para guardar en asignación
                localStorage.setItem("usuarioNombre", data.nombre);
                localStorage.setItem("rol", data.rol);

                // También en sessionStorage si lo usas
                sessionStorage.setItem("usuario", data.nombre);
                sessionStorage.setItem("rol", data.rol);

                window.location.href = "menu.html";
            } else {
                showMessage("Error: " + data.message, "alert-danger");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            showMessage("Hubo un problema con el inicio de sesión.", "alert-danger");
        });
    });

    function showMessage(message, type) {
        let messageBox = document.getElementById("messageBox");
        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "messageBox";
            messageBox.className = `alert ${type} mt-3`;
            document.querySelector(".card").prepend(messageBox);
        }
        messageBox.textContent = message;
        messageBox.className = `alert ${type} mt-3`;

        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }
});
