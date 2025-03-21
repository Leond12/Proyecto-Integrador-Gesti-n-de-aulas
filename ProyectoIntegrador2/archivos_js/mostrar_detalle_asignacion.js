document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const idAsignacion = params.get("id");

    if (!idAsignacion || idAsignacion === "undefined") {
        alert("No se encontró la asignación.");
        window.location.href = "buscador.html";
        return;
    }

    console.log("🆔 ID de asignación recibido:", idAsignacion);

    fetch(`http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/buscar_detalle_asignacion.php?id=${idAsignacion}`)
        .then(response => response.json())
        .then(data => {
            console.log("📡 Respuesta del servidor:", data);

            if (data.error) {
                alert("No se encontraron detalles de la asignación.");
                window.location.href = "buscador.html";
                return;
            }

            document.getElementById("campo").textContent = data.campo || "No disponible";
            document.getElementById("docente").textContent = data.docente || "No disponible";
            document.getElementById("materia").textContent = data.materia || "No disponible";
            document.getElementById("turno").textContent = data.turno || "No disponible";
            document.getElementById("fecha_inicio").textContent = data.fecha_inicio || "No disponible";
            document.getElementById("fecha_final").textContent = data.fecha_final || "No disponible";
        })
        .catch(error => {
            console.error("⚠️ Error al obtener los detalles:", error);
            alert("Error al obtener los detalles.");
        });
});
