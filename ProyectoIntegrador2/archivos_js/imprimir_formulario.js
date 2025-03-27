document.addEventListener("DOMContentLoaded", function () {
    const imprimirBtn = document.getElementById("imprimir");

    if (imprimirBtn) {
        imprimirBtn.addEventListener("click", function () {
            // Detectar si estamos en confirmacion.html o detalle_asignacion.html
            if (window.location.pathname.includes("confirmacion.html")) {
                // Obtener datos desde localStorage
                const datos = {
                    docente: localStorage.getItem("docenteSeleccionado") || "Desconocido",
                    materia: localStorage.getItem("materiaSeleccionada") || "Desconocida",
                    campo: localStorage.getItem("campoSeleccionado") || "No asignado",
                    turno: localStorage.getItem("turnoSeleccionado") || "Desconocido",
                    fecha_inicio: localStorage.getItem("fechaInicio") || "N/A",
                    fecha_final: localStorage.getItem("fechaFinal") || "N/A",
                    descripcion: localStorage.getItem("descripcionAsignacion") || ""
                };
                generarPDF(datos);
            } else {
                // Obtener datos desde el DOM en detalle_asignacion.html
                const datos = {
                    docente: document.getElementById("docente")?.textContent || "Desconocido",
                    materia: document.getElementById("materia")?.textContent || "Desconocida",
                    campo: document.getElementById("campo")?.textContent || "No asignado",
                    turno: document.getElementById("turno")?.textContent || "Desconocido",
                    fecha_inicio: document.getElementById("fecha_inicio")?.textContent || "N/A",
                    fecha_final: document.getElementById("fecha_final")?.textContent || "N/A",
                    descripcion: document.getElementById("descripcion")?.textContent || ""
                };
                generarPDF(datos);
            }
        });
    }
});

function generarPDF(datos) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cargar imágenes
    const logoCarrera = "imagenes/logo_carrera.png";
    const logoJaguares = "imagenes/jaguares_utepsa.png";

    // Agregar logos
    doc.addImage(logoCarrera, "PNG", 13, 10, 30, 30);
    doc.addImage(logoJaguares, "PNG", 168, 10, 30, 30);

    // Encabezado
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
    doc.text("DESCRIPCIÓN:", 20, 96);
    doc.text(datos.descripcion, 20, 104, { maxWidth: 170 });

    doc.line(20, 120, 90, 120);
    doc.line(120, 120, 190, 120);
    doc.text("FIRMA DOCENTE", 40, 130);
    doc.text("FIRMA COORDINACIÓN", 140, 130);

    // Abrir ventana para imprimir
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
}
