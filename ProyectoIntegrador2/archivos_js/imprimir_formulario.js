document.addEventListener("DOMContentLoaded", function () {
    const imprimirBtn = document.getElementById("btnImprimir");

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


/*document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnImprimir").addEventListener("click", function () {
        generarPDF();
    })
});

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cargar imágenes
    const logoCarrera = "imagenes/logo_carrera.png";
    const logoJaguares = "imagenes/jaguares_utepsa.png";

    // Agregar logos
    doc.addImage(logoCarrera, "PNG", 15, 10, 30, 30);
    doc.addImage(logoJaguares, "PNG", 165, 10, 30, 30);

    // Encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("UNIVERSIDAD TECNOLÓGICA PRIVADA DE SANTA CRUZ", 50, 15);
    doc.setFontSize(10);
    doc.text("LABORATORIO DE SISTEMAS, REDES Y TELECOMUNICACIONES", 55, 20);

    // Título del formulario
    doc.setFontSize(14);
    doc.text("FORMULARIO DE RESERVA", 75, 35);

    // Datos del formulario
    doc.setFontSize(10);
    doc.text("DOCENTE:", 15, 45);
    doc.text("TELÉFONO:", 115, 45);
    doc.text("MATERIA:", 15, 55);
    doc.text("MÓDULO:", 115, 55);
    doc.text("CANT. DE ALUMNOS:", 150, 55);
    
    // Tabla de horarios
    doc.text("HORARIO:", 15, 65);
    doc.text("AULA:", 150, 65);
    
    doc.setFont("helvetica", "normal");
    doc.text("07:15/10:00", 15, 72);
    doc.text("10:15/13:00", 15, 78);
    doc.text("13:15/16:00", 15, 84);
    doc.text("16:15/19:00", 15, 90);
    doc.text("19:15/22:00", 15, 96);
    doc.text("B-217/B-218", 150, 72);

    // Fecha de reserva
    doc.setFont("helvetica", "bold");
    doc.text("FECHA DE RESERVA:", 15, 105);
    doc.setFont("helvetica", "normal");
    doc.text("Lun  1  2  3  4  5  6  7", 15, 112);
    doc.text("Mar  8  9 10 11 12 13 14", 15, 118);
    doc.text("Mié 15 16 17 18 19 20 21", 15, 124);
    doc.text("Jue 22 23 24 25 26 27 28", 15, 130);
    doc.text("Vie 29 30 31", 15, 136);

    // Requerimientos y observaciones
    doc.setFont("helvetica", "bold");
    doc.text("REQUERIMIENTOS:", 15, 145);
    doc.setFont("helvetica", "normal");
    doc.rect(15, 148, 180, 10); // Cuadro vacío

    doc.setFont("helvetica", "bold");
    doc.text("OBSERVACIONES:", 15, 165);
    doc.setFont("helvetica", "normal");
    doc.rect(15, 168, 180, 10); // Cuadro vacío

    // Firmas
    doc.text("Encargado del Laboratorio", 30, 190);
    doc.text("Docente solicitante", 140, 190);

    // Nota final
    doc.setFontSize(8);
    doc.text("Cualquier reserva o requerimiento debe ser solicitado con un mínimo de 48 horas de anticipación", 30, 200);

    // Enviar a imprimir
    doc.autoPrint();
    window.open(doc.output("bloburl"), "_blank");
}*/