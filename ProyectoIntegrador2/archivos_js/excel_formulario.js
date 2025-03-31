document.addEventListener("DOMContentLoaded", function () {
    const exportarBtn = document.getElementById("excelexport");

    if (exportarBtn) {
        exportarBtn.addEventListener("click", function () {
            let datos = {};

            if (window.location.pathname.includes("asignar.html")) {
                datos = {
                    docente: localStorage.getItem("docenteSeleccionado") || "Desconocido",
                    materia: localStorage.getItem("materiaSeleccionada") || "Desconocida",
                    campo: localStorage.getItem("campoSeleccionado") || "No asignado",
                    turno: localStorage.getItem("turnoSeleccionado") || "Desconocido",
                    fecha_inicio: localStorage.getItem("fechaInicio") || "N/A",
                    fecha_final: localStorage.getItem("fechaFinal") || "N/A",
                    descripcion: localStorage.getItem("descripcionAsignacion") || "",
                    requerimientos: localStorage.getItem("requerimientosAsignacion") || "",
                    dias: localStorage.getItem("diasAsignacion") || ""
                };
            } else {
                datos = {
                    docente: document.getElementById("docente")?.textContent || "Desconocido",
                    materia: document.getElementById("materia")?.textContent || "Desconocida",
                    campo: document.getElementById("campo")?.textContent || "No asignado",
                    turno: document.getElementById("turno")?.textContent || "Desconocido",
                    fecha_inicio: document.getElementById("fecha_inicio")?.textContent || "N/A",
                    fecha_final: document.getElementById("fecha_final")?.textContent || "N/A",
                    descripcion: document.getElementById("descripcion")?.textContent || "",
                    requerimientos: document.getElementById("requerimientos")?.textContent || "",
                    dias: document.getElementById("dias")?.textContent || ""
                };
            }

            exportarExcel(datos);
        });
    }
});

function exportarExcel(datos) {
    const wb = XLSX.utils.book_new();

     // ✅ Convertir días si vienen como números
     const diasMap = {
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sábado"
    };

    let diasTexto = datos.dias;
    if (/^\d+(,\d+)*$/.test(diasTexto)) {
        diasTexto = diasTexto
            .split(",")
            .map(n => diasMap[parseInt(n.trim())] || "")
            .filter(Boolean)
            .join(", ");
    }

    const datosAsignacion = [
        ["Docente", datos.docente],
        ["Materia", datos.materia],
        ["Aula/Laboratorio", datos.campo],
        ["Turno", datos.turno],
        ["Fecha de Inicio", datos.fecha_inicio],
        ["Fecha Final", datos.fecha_final],
        ["Días", diasTexto],
        ["Requerimientos", datos.requerimientos],
        ["Descripción", datos.descripcion]
    ];

    const ws = XLSX.utils.aoa_to_sheet(datosAsignacion);
    XLSX.utils.book_append_sheet(wb, ws, "Asignación");

    XLSX.writeFile(wb, "asignacion.xlsx");
}
