document.addEventListener("DOMContentLoaded", function () {
    const imprimirBtn = document.getElementById("imprimir");

    if (imprimirBtn) {
        imprimirBtn.addEventListener("click", function () {
            let datos;

            if (window.location.pathname.includes("asignar.html")) {
                // Convertir IDs de días a nombres
                const diasMap = {
                    1: "Lunes",
                    2: "Martes",
                    3: "Miércoles",
                    4: "Jueves",
                    5: "Viernes",
                    6: "Sábado"
                };

                let diasNombres = "";
                const diasSeleccionados = localStorage.getItem("diasSeleccionados");

                if (diasSeleccionados) {
                    diasNombres = diasSeleccionados
                        .split(",")
                        .map(num => diasMap[parseInt(num.trim())] || "")
                        .filter(Boolean)
                        .join(", ");
                }

                datos = {
                    docente: localStorage.getItem("docenteSeleccionado") || "Desconocido",
                    materia: localStorage.getItem("materiaSeleccionada") || "Desconocida",
                    campo: localStorage.getItem("campoSeleccionado") || "No asignado",
                    turno: localStorage.getItem("turnoSeleccionado") || "Desconocido",
                    fecha_inicio: localStorage.getItem("fechaInicio") || "N/A",
                    fecha_final: localStorage.getItem("fechaFinal") || "N/A",
                    descripcion: localStorage.getItem("descripcionAsignacion") || "",
                    requerimientos: localStorage.getItem("requerimientosAsignacion") || "",
                    dias: diasNombres
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

            generarPDF(datos);
        });
    }
});

function generarPDF(datos) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const logoCarrera = "imagenes/logo_carrera.png";
    const logoJaguares = "imagenes/jaguares_utepsa.png";

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

    doc.addImage(logoCarrera, "PNG", 13, 10, 30, 30);
    doc.addImage(logoJaguares, "PNG", 168, 10, 30, 30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("UNIVERSIDAD TECNOLÓGICA PRIVADA DE SANTA CRUZ", 47, 15);
    doc.setFontSize(10);
    doc.text("LABORATORIO DE SISTEMAS, REDES Y TELECOMUNICACIONES", 50, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("ASIGNACIÓN DE AULA / LABORATORIO", 60, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(`DOCENTE: ${datos.docente}`, 20, 48);
    doc.text(`MATERIA: ${datos.materia}`, 20, 56);
    doc.text(`AULA: ${datos.campo}`, 20, 64);
    doc.text(`TURNO: ${datos.turno}`, 20, 72);
    doc.text(`FECHA DE INICIO: ${datos.fecha_inicio}`, 20, 80);
    doc.text(`FECHA FINAL: ${datos.fecha_final}`, 20, 88);
    doc.text(`DÍAS: ${diasTexto}`, 20, 96);
    doc.text("REQUERIMIENTOS:", 20, 104);
    doc.text(datos.requerimientos || "Ninguno", 20, 110, { maxWidth: 170 });
    doc.text("DESCRIPCIÓN:", 20, 118);
    doc.text(datos.descripcion || "Sin descripción", 20, 124, { maxWidth: 170 });

    doc.line(20, 140, 90, 140);
    doc.line(120, 140, 190, 140);
    doc.text("FIRMA DOCENTE", 40, 148);
    doc.text("FIRMA COORDINACIÓN", 140, 148);

    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
}
