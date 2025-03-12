document.getElementById("submitBtn").addEventListener("click", function () {
    let ci_docente = document.getElementById("ci_docente").value.trim();
    let nombre_docente = document.getElementById("nombre_docente").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let messageBox = document.getElementById("messageBox");

    if (ci_docente === "" || nombre_docente === "" || telefono === "") {
        showMessage("Por favor, complete todos los campos antes de añadir.", "alert-danger");
        return;
    }

    let formData = new FormData();
    formData.append("ci_docente", ci_docente);
    formData.append("nombre_docente", nombre_docente);
    formData.append("telefono", telefono);

    fetch("archivos_php/registrar_docente.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
        if (data.success) {
            showMessage("Docente registrado correctamente.", "alert-success");
            document.getElementById("docenteForm").reset(); // Limpiar el formulario
        } else {
            showMessage("Error: " + data.message, "alert-danger");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        showMessage("Hubo un problema con el registro.", "alert-danger");
    });
});

// Función para mostrar mensajes en la página sin alertas emergentes
function showMessage(message, type) {
    let messageBox = document.getElementById("messageBox");
    messageBox.textContent = message;
    messageBox.className = `alert ${type} mt-3`;
    messageBox.classList.remove("d-none");

    setTimeout(() => {
        messageBox.classList.add("d-none");
    }, 3000); // Ocultar después de 3 segundos
}
