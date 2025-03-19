document.addEventListener("DOMContentLoaded", function () {
     // Mapeo de turnos con sus horarios
     const horariosTurnos = {
        "1": "7 am - 10 am",
        "2": "10 am - 1 pm",
        "3": "1 pm - 4 pm",
        "4": "4 pm - 7 pm",
        "5": "7 pm - 10 pm"
    };

    // Cargar Aula / Laboratorio / Salón
    const campoInput = document.getElementById("campo");
    const campoSeleccionado = localStorage.getItem("campoSeleccionado");

    if (campoSeleccionado) {
        campoInput.value = campoSeleccionado;
    }

    // Cargar Turno con franja horaria
    const turnoInput = document.getElementById("turno");
    const turnoSeleccionado = localStorage.getItem("turnoSeleccionado");
    
    if (turnoSeleccionado) {
        turnoInput.value = horariosTurnos[turnoSeleccionado] || horariosTurnos[1];
    }
    
    // Cargar Docente
    const docenteInput = document.getElementById("docente");
    const docenteSeleccionado = localStorage.getItem("docenteSeleccionado");
    
    if (docenteSeleccionado) {
        docenteInput.value = docenteSeleccionado;
    }
    
    // Cargar Materia
    const materiaInput = document.getElementById("materia");
    const materiaSeleccionada = localStorage.getItem("materiaSeleccionada");
    
    if (materiaSeleccionada) {
        materiaInput.value = materiaSeleccionada;
    }
    // Funcionalidad de los botones "X" para limpiar inputs
    document.querySelectorAll(".clear-input").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            let inputField = document.getElementById(targetId);

            if (inputField) {
                inputField.value = ""; // Limpiar el input
                localStorage.removeItem(targetId + "Seleccionado"); // Eliminar del localStorage
            }
        });
        
    });

    
   
    
});
   
function volver() {
    localStorage.clear();// Eliminar del localStorage
    window.location.href = "menu.html";
}