document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const campoId = params.get("id");

    if (!campoId) {
        alert("No se ha encontrado el aula.");
        return;
    }

    // Hacer una petición al servidor para obtener los detalles del aula
    fetch(`http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/mostrar_campo.php?campoId=${encodeURIComponent(campoId)}`)

        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Error al obtener los datos del aula.");
                return;
            }

            // Asegurarnos de que los elementos existen antes de asignarles valores
            document.getElementById("numero").value = data.numero || "";
            document.getElementById("piso").value = data.piso || "";
            document.getElementById("capacidad").value = data.capacidad || "";
            document.getElementById("tipo").value = data.tipo || "";
            document.getElementById("descripcion").value = data.descripcion || "";
            document.getElementById("estado").value = data.estado || "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema al cargar los datos del aula.");
        });
});
