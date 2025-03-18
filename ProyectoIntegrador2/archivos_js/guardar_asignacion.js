document.addEventListener("DOMContentLoaded", function () {
    const guardarBtn = document.getElementById("guardar-asignacion");

    guardarBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 🔹 Evita el envío automático del formulario

        console.log("✅ Botón 'Guardar Asignación' fue clickeado.");

        const campo = document.getElementById("campo").value;
        const turnoTexto = document.getElementById("turno").value;
        const docente = document.getElementById("docente").value;
        const materia = document.getElementById("materia").value;
        const usuario = localStorage.getItem("usuarioId") || "1";
        const descripcion = document.getElementById("descripcion").value || "";
        const fechaInicio = document.getElementById("fecha_inicio").value;
        const fechaFinal = document.getElementById("fecha_final").value;

        console.log("📝 Valores obtenidos:", { campo, turnoTexto, docente, materia, fechaInicio, fechaFinal });

        // ⚠️ Validación de campos obligatorios
        if (!campo || !turnoTexto || !docente || !materia || !fechaInicio || !fechaFinal) {
            console.error("❌ Faltan campos obligatorios.");
            alert("Todos los campos son obligatorios.");
            return;
        }

        const turnosMap = {
            "7 am - 10 am": 1,
            "10 am - 1 pm": 2,
            "1 pm - 4 pm": 3,
            "4 pm - 7 pm": 4,
            "7 pm - 10 pm": 5
        };

        const turno = turnosMap[turnoTexto] || null;
        if (!turno) {
            console.error("❌ Turno no válido:", turnoTexto);
            alert("El turno seleccionado no es válido.");
            return;
        }

        console.log("✅ Datos validados, enviando a `guardar_asignacion.php`.");

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

        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/guardar_asignacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(asignacionData)
        })
        .then(response => {
            console.log("📡 Respuesta recibida:", response);
            return response.json();
        })
        .then(data => {
            console.log("✅ Respuesta del servidor:", data);

            if (data.success) {
                alert(data.success);

                // Redirigir solo si todo salió bien
                setTimeout(() => {
                    console.log("➡️ Redirigiendo a menu.html");
                    window.location.replace("menu.html");
                }, 1000);
            } else {
                console.error("❌ Error del servidor:", data.error);
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("⚠️ Error en la solicitud:", error);
            alert("Hubo un error en la solicitud. Revisa la consola para más detalles.");
        });
    });
});
