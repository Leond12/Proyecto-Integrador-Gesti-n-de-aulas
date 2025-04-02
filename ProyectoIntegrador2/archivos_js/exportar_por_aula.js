document.addEventListener("DOMContentLoaded", function () {
    const inputAula = document.getElementById("input-aula");
    const exportarBtn = document.getElementById("btn-exportar-aula");

    if (exportarBtn) {
        exportarBtn.addEventListener("click", async function () {
            const aula = inputAula.value.trim();
            if (aula === "") {
                alert("Ingrese un nombre de aula.");
                return;
            }

            try {
                const response = await fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/exportar_por_aula.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ aula })
                });

                const resultado = await response.json();

                if (resultado.success === false) {
                    alert(resultado.message || "Error al buscar el aula.");
                    return;
                }

                generarExcel(resultado.datos, aula);
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al conectar con el servidor.");
            }
        });
    }

    function generarExcel(asignaciones, aulaNombre) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(asignaciones);
        XLSX.utils.book_append_sheet(wb, ws, "Asignaciones");

        XLSX.writeFile(wb, `Asignaciones_${aulaNombre}.xlsx`);
    }
});
