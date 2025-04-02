document.addEventListener("DOMContentLoaded", function () {
    const btnSemestre1 = document.querySelector("#vista-semestre button:nth-child(2)");
    const btnSemestre2 = document.querySelector("#vista-semestre button:nth-child(3)");

    if (btnSemestre1 && btnSemestre2) {
        btnSemestre1.addEventListener("click", function () {
            exportarPorSemestre(1); // Enero - Junio
        });

        btnSemestre2.addEventListener("click", function () {
            exportarPorSemestre(2); // Julio - Diciembre
        });
    }

    function exportarPorSemestre(semestre) {
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/exportar_por_semestre.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ semestre: semestre })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                exportarExcel(data.datos, `Asignaciones_Semestre${semestre}`);
            } else {
                alert(data.message || "No se encontraron asignaciones.");
            }
        })
        .catch(error => {
            console.error("Error al exportar:", error);
            alert("Error al exportar asignaciones.");
        });
    }

    function exportarExcel(datos, nombreArchivo) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(datos);
        XLSX.utils.book_append_sheet(wb, ws, "Asignaciones");
        XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
    }
});
