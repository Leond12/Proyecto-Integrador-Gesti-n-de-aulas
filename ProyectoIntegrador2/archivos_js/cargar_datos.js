document.addEventListener("DOMContentLoaded", function () {
    // Cargar Aula / Laboratorio / Salón
    const campoInput = document.getElementById("campo");
    const campoSeleccionado = localStorage.getItem("campoSeleccionado");

    if (campoSeleccionado) {
        campoInput.value = campoSeleccionado;
    }

    // Cargar Turno
    const turnoInput = document.getElementById("turno");
    const turnoSeleccionado = localStorage.getItem("turnoSeleccionado");

    if (turnoSeleccionado) {
        turnoInput.value = `Turno ${turnoSeleccionado}`;
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