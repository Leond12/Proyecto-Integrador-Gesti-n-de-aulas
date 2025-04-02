document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("input[name='semestre']");
    const botonesModulo = document.querySelectorAll(".btn-modulo");

    botonesModulo.forEach(boton => {
        boton.addEventListener("click", function () {
            const modulo = parseInt(this.getAttribute("data-modulo"));

            // Verificar si algún checkbox está marcado
            let semestreSeleccionado = null;
            checkboxes.forEach(cb => {
                if (cb.checked) semestreSeleccionado = parseInt(cb.value);
            });

            if (!semestreSeleccionado) {
                alert("Debes seleccionar un semestre antes de elegir un módulo.");
                return;
            }

            // Enviar solicitud al backend
            fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/exportar_por_modulo.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    semestre: semestreSeleccionado,
                    modulo: modulo
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    exportarExcel(data.datos, `Asignaciones_Semestre${semestreSeleccionado}_Modulo${modulo}`);
                } else {
                    alert(data.message || "No se encontraron asignaciones.");
                }
            })
            .catch(error => {
                console.error("Error al exportar:", error);
                alert("Error al exportar asignaciones.");
            });
        });
    });

    // Función para exportar a Excel
    function exportarExcel(datos, nombreArchivo) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(datos);

        XLSX.utils.book_append_sheet(wb, ws, "Asignaciones");
        XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
    }
});
