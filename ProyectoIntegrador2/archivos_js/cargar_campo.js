document.addEventListener("DOMContentLoaded", function () {
    const campoInput = document.getElementById("campo");
    const campoSeleccionado = localStorage.getItem("campoSeleccionado");

    if (campoSeleccionado) {
        campoInput.value = campoSeleccionado; // Mostrar el aula seleccionada
        localStorage.removeItem("campoSeleccionado"); // Eliminarlo después de usarlo
    }
});
