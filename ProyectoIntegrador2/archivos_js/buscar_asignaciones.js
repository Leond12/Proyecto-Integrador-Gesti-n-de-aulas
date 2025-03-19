document.addEventListener("DOMContentLoaded", function () {
    const inputBusqueda = document.querySelector(".input-group input");
    const tablaResultados = document.querySelector(".table tbody");

    function buscarAsignaciones(termino) {
        fetch(`http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/buscar_asignaciones.php?query=${encodeURIComponent(termino)}`)
            .then(response => response.json())
            .then(data => {
                console.log("📡 Datos recibidos:", data); // ✅ Verificar si los datos llegan correctamente
                mostrarResultados(data);
            })
            .catch(error => console.error("⚠ Error al buscar asignaciones:", error));
    }

    function mostrarResultados(asignaciones) {
        tablaResultados.innerHTML = "";
    
        if (!asignaciones || asignaciones.length === 0) {
            tablaResultados.innerHTML = "<tr><td colspan='4'>No se encontraron resultados.</td></tr>";
            return;
        }
    
        asignaciones.forEach(asignacion => {
            console.log("🆔 ID de asignación en resultado:", asignacion.id); // ✅ Verifica si el ID está en los datos
    
            const fila = document.createElement("tr");
            fila.classList.add("clickable-row");
            fila.dataset.id = asignacion.id; // ✅ Guardar ID en `data-id`
    
            fila.innerHTML = `
                <td>${asignacion.campo}</td>
                <td>${asignacion.docente}</td>
                <td>${asignacion.materia}</td>
                <td>${asignacion.turno}</td>
            `;
    
            fila.addEventListener("click", function () {
                const idAsignacion = this.dataset.id;
                console.log("🔗 Redirigiendo a detalle_asignacion.html?id=" + idAsignacion);
                window.location.href = `detalle_asignacion.html?id=${idAsignacion}`;
            });
    
            tablaResultados.appendChild(fila);
        });
    }
   

    inputBusqueda.addEventListener("input", function () {
        const termino = inputBusqueda.value.trim();
        if (termino.length > 0) {
            buscarAsignaciones(termino);
        } else {
            tablaResultados.innerHTML = "";
        }
    });
});
