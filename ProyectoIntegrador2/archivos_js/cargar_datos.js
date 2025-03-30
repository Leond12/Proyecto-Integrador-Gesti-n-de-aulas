document.addEventListener("DOMContentLoaded", function () {
    // Mapeo de turnos con sus horarios
    const horariosTurnos = {
        "1": "Mañana 7-10",
        "2": "Mañana 10-13",
        "3": "Tarde 13-16",
        "4": "Tarde 16-19",
        "5": "Noche 19-22"
    };
    const fechaInicioInput = document.getElementById("fecha_inicio");
    const fechaFinalInput = document.getElementById("fecha_final");

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

    //fechas
    const hoy = new Date().toISOString().split("T")[0];

    // Establecer mínimo para fecha de inicio
    fechaInicioInput.min = hoy;

    // Cuando se seleccione una fecha de inicio
    fechaInicioInput.addEventListener("change", function () {
        fechaFinalInput.min = this.value; // Fecha final no puede ser menor a inicio
        // Si fecha final actual es menor, limpiarla
        if (fechaFinalInput.value < this.value) {
            fechaFinalInput.value = ""; 
        }
    });
    
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

    // **🚀 Detectar si es una nueva sesión (cerró y volvió a abrir el navegador) 🚀**
    if (!sessionStorage.getItem("sesionActiva")) {
        localStorage.clear(); // Limpiar localStorage al abrir una nueva sesión
        sessionStorage.setItem("sesionActiva", "true"); // Marcar que la sesión está activa
    }
});

function limpiarLocalStorageConservarCredenciales() {
    const usuario = localStorage.getItem("usuario");
    const contrasena = localStorage.getItem("contrasena");
    const usuarioNombre = localStorage.getItem("usuarioNombre"); // 👈 Guardar nombre también

    localStorage.clear();

    if (usuario) localStorage.setItem("usuario", usuario);
    if (contrasena) localStorage.setItem("contrasena", contrasena);
    if (usuarioNombre) localStorage.setItem("usuarioNombre", usuarioNombre); // 👈 Restaurar nombre
}



// Función para limpiar `localStorage` y volver al menú
function volver() {
    limpiarLocalStorageConservarCredenciales();
    window.location.href = "menu.html";
}
