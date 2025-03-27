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

        const fechaInicioFormato = fechaInicio ? new Date(fechaInicio).toISOString().split("T")[0] : "";
        const fechaFinalFormato = fechaFinal ? new Date(fechaFinal).toISOString().split("T")[0] : "";


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

        // Validar que las fechas no estén vacías
        if (!fechaInicioFormato || !fechaFinalFormato) {
            alert("Debe seleccionar una fecha válida.");
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
            fecha_inicio: fechaInicioFormato,
            fecha_final: fechaFinalFormato
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
            
                // ✅ Guardar datos en localStorage para imprimir
                const datosAsignacion = {
                    docente: docente,
                    materia: materia,
                    campo: campo,
                    turno: turnoTexto, // Este es el texto del turno visible
                    fecha_inicio: fechaInicioFormato,
                    fecha_final: fechaFinalFormato,
                    descripcion: descripcion
                };
                localStorage.setItem("asignacionReciente", JSON.stringify(datosAsignacion));
            
                // Ocultar botones de buscar y limpiar
                document.querySelectorAll("button.btn-danger").forEach(btn => btn.style.display = "none");
                document.querySelectorAll("button.btn-outline-secondary").forEach(btn => btn.style.display = "none");
            
                // Ocultar el botón de guardar
                guardarBtn.style.display = "none";
            
                // Crear contenedor para los botones si no existe
                let accionesDiv = document.getElementById("acciones-finales");
                if (!accionesDiv) {
                    accionesDiv = document.createElement("div");
                    accionesDiv.id = "acciones-finales";
                    accionesDiv.style.marginTop = "20px";
                    accionesDiv.style.display = "flex";
                    accionesDiv.style.gap = "10px";
                    accionesDiv.style.justifyContent = "center";
                    guardarBtn.parentNode.appendChild(accionesDiv);
                }
            
                // Botón "Volver al Menú"
                const volverBtn = document.createElement("button");
                volverBtn.textContent = "Volver al Menú";
                volverBtn.className = "btn btn-primary";
                volverBtn.onclick = function () {
                    localStorage.clear();
                    window.location.href = "menu.html";
                };
            
                // Botón "Imprimir"
                const imprimirBtn = document.createElement("button");
                imprimirBtn.textContent = "Imprimir";
                imprimirBtn.className = "btn btn-imprimir";
                imprimirBtn.id = "imprimir";
                imprimirBtn.onclick = function () {
                    const datos = JSON.parse(localStorage.getItem("asignacionReciente"));
                    if (datos) {
                        generarPDF(datos);
                    } else {
                        alert("No hay datos para imprimir.");
                    }
                };
            
                accionesDiv.appendChild(imprimirBtn);
                accionesDiv.appendChild(volverBtn);            

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
