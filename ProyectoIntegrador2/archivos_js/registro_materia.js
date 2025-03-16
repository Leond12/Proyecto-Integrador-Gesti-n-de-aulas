document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".save-button");
    const codigoInput = document.getElementById("codigo");
    const materiaInput = document.getElementById("materia");
    const facultadSelect = document.getElementById("facultad");

    // Cargar facultades al iniciar la página
    function cargarFacultades() {
        fetch(  "http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/obtener_facultades.php")
          
        //ruta anterior
        //fetch("http://localhost/ProyectoIntegrador2/archivos_php/obtener_facultades.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    llenarFacultades(data.data);
                } else {
                    console.error("Error:", data.message);
                    facultadSelect.innerHTML = `<option value="">No hay facultades disponibles</option>`;
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                facultadSelect.innerHTML = `<option value="">Error al cargar facultades</option>`;
            });
    }

    // Función para llenar el select con las facultades obtenidas
    function llenarFacultades(facultades) {
        facultadSelect.innerHTML = `<option value="">Seleccione una facultad</option>`; // Opción por defecto
        facultades.forEach(facultad => {
            let option = document.createElement("option");
            option.value = facultad.id;
            option.textContent = facultad.nombre;
            facultadSelect.appendChild(option);
        });
    }

    // Evento para registrar una materia
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        let codigo = codigoInput.value.trim();
        let nombre = materiaInput.value.trim();
        let facultad = facultadSelect.value;

        if (codigo === "" || nombre === "" || facultad === "") {
            showMessage("Por favor, complete todos los campos antes de añadir.", "alert-danger");
            return;
        }

        let formData = new FormData();
        formData.append("codigo", codigo);
        formData.append("nombre", nombre);
        formData.append("facultad", facultad);

        fetch("http://localhost/ProyectoIntegrador2/archivos_php/registrar_materia.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage("Materia registrada correctamente.", "alert-success");
                document.querySelector("form").reset();
            } else {
                showMessage("Error: " + data.message, "alert-danger");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            showMessage("Hubo un problema con el registro.", "alert-danger");
        });
    });

    function showMessage(message, type) {
        let messageBox = document.getElementById("messageBox");
        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "messageBox";
            messageBox.className = `alert ${type} mt-3`;
            document.querySelector(".form-container").prepend(messageBox);
        }
        messageBox.textContent = message;
        messageBox.className = `alert ${type} mt-3`;

        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }

    cargarFacultades(); // Llamar a la función al cargar la página
});