document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardar-asignacion");

    guardarBtn.addEventListener("click", function () {
        // Obtener valores de los inputs
        const campo = document.getElementById("campo").value;
        const turno = document.getElementById("turno").value.replace("Turno ", ""); // Extraer solo el número de turno
        const docente = document.getElementById("docente").value;
        const materia = document.getElementById("materia").value;
        const usuario = localStorage.getItem("usuarioId") || "1"; // Usuario (Asegurar que haya un ID de usuario)
        const descripcion = document.getElementById("descripcion").value || "";
        const fechaInicio = document.getElementById("fecha_inicio").value;
        const fechaFinal = document.getElementById("fecha_final").value;

        if (!campo || !turno || !docente || !materia || !fechaInicio || !fechaFinal) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Crear objeto con los datos a enviar
        const asignacionData = {
            campo: campo,
            docente: docente,
            materia: materia,
            turno: turno,
            usuario: usuario,
            descripcion: descripcion,
            fecha_inicio: fechaInicio,
            fecha_final: fechaFinal
        };

        // Enviar los datos a `guardar_asignacion.php`
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/guardar_asignacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asignacionData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
                window.location.href = "menu.html"; // Redirigir después de guardar
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
