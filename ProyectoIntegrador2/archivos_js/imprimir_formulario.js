document.addEventListener("DOMContentLoaded", function () {
    const imprimirBtn = document.getElementById("imprimir");

    if (imprimirBtn) {
        imprimirBtn.addEventListener("click", function () {
            // Detectar si estamos en asignar.html
            if (window.location.pathname.includes("asignar.html")) {
                const datos = {
                    docente: localStorage.getItem("docenteSeleccionado") || "Desconocido",
                    materia: localStorage.getItem("materiaSeleccionada") || "Desconocida",
                    campo: localStorage.getItem("campoSeleccionado") || "No asignado",
                    turno: localStorage.getItem("turnoSeleccionado") || "Desconocido",
                    fecha_inicio: localStorage.getItem("fechaInicio") || "N/A",
                    fecha_final: localStorage.getItem("fechaFinal") || "N/A",
                    descripcion: localStorage.getItem("descripcionAsignacion") || "",
                    requerimientos: localStorage.getItem("requerimientosAsignacion") || "",
                    dias: localStorage.getItem("diasSeleccionados") || ""
                };
                generarPDF(datos);
            } else {
                const datos = {
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


    // Contenido
    doc.text(`DOCENTE: ${datos.docente}`, 20, 48);
    doc.text(`MATERIA: ${datos.materia}`, 20, 56);
    doc.text(`AULA: ${datos.campo}`, 20, 64);
    doc.text(`TURNO: ${datos.turno}`, 20, 72);
    doc.text(`FECHA DE INICIO: ${datos.fecha_inicio}`, 20, 80);
    doc.text(`FECHA FINAL: ${datos.fecha_final}`, 20, 88);
    doc.text(`DÍAS: ${datos.dias}`, 20, 96);
    doc.text("REQUERIMIENTOS:", 20, 104);
    doc.text(datos.requerimientos || "Ninguno", 20, 110, { maxWidth: 170 });
    doc.text("DESCRIPCIÓN:", 20, 118);
    doc.text(datos.descripcion || "Sin descripción", 20, 124, { maxWidth: 170 });

    // Líneas de firma
    doc.line(20, 140, 90, 140);
    doc.line(120, 140, 190, 140);
    doc.text("FIRMA DOCENTE", 40, 148);
    doc.text("FIRMA COORDINACIÓN", 140, 148);

    // Imprimir
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
}
