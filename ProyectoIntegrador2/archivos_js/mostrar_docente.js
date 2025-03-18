document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("docenteTableBody");
    const searchInput = document.getElementById("searchInput");
    const assignBtn = document.getElementById("assignBtn");
    const backButton = document.querySelector(".back"); // Botón "Volver" de la página
    let docentes = [];
    let selectedDocente = localStorage.getItem("docenteSeleccionado") || null; // Ahora solo almacena el nombre

    // Función para obtener los docentes desde el backend
    function fetchDocentes() {
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/mostrar_docente.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    docentes = data.data;
                    renderDocentes(docentes);
                } else {
                    console.error("Error:", data.message);
                    tableBody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                tableBody.innerHTML = `<tr><td colspan="4">Error al cargar los docentes</td></tr>`;
            });
    }

    // Función para renderizar los docentes en la tabla
    function renderDocentes(filteredDocentes) {
        tableBody.innerHTML = "";
        filteredDocentes.forEach((docente) => {
            let isSelected = selectedDocente === docente.nombre ? "checked" : "";
            let isDisabled = selectedDocente === docente.nombre ? "disabled" : "";

            let row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="radio" name="docenteSeleccionado" value="${docente.nombre}" ${isSelected} ${isDisabled}></td>
                <td>${docente.ci}</td>
                <td>${docente.nombre}</td>
                <td>${docente.telefono}</td>
            `;
            tableBody.appendChild(row);
        });

        // Agregar evento a los radio buttons después de renderizar la tabla
        document.querySelectorAll('input[name="docenteSeleccionado"]').forEach(radio => {
            radio.addEventListener("change", handleDocenteSelection);
        });

        // Habilitar el botón asignar si ya había un docente seleccionado
        if (selectedDocente) {
            assignBtn.disabled = false;
        }
    }

    // Función para manejar la selección de docentes
    function handleDocenteSelection(event) {
        let newSelectedDocenteNombre = event.target.value;

        if (selectedDocente && selectedDocente !== newSelectedDocenteNombre) {
            let confirmChange = confirm("¿Desea cambiar de docente?");
            if (!confirmChange) {
                event.target.checked = false; // Desmarcar la nueva selección
                return;
            }
        }

        selectedDocente = newSelectedDocenteNombre;
        assignBtn.disabled = false; // Habilitar el botón de asignar
    }

    // Evento para asignar un docente y guardar solo su nombre en localStorage
    assignBtn.addEventListener("click", function () {
        if (selectedDocente) {
            localStorage.setItem("docenteSeleccionado", selectedDocente); // Guarda solo el nombre

            //alert(`Docente asignado correctamente: ${selectedDocente}`);
            disableSelectedDocente(); // Deshabilitar la opción para evitar cambios
        }
    });

    // Función para deshabilitar la opción seleccionada y evitar cambios
    function disableSelectedDocente() {
        document.querySelectorAll('input[name="docenteSeleccionado"]').forEach(radio => {
            if (radio.value === selectedDocente) {
                radio.disabled = true;
            } else {
                radio.disabled = false;
            }
        });
    }

    // Filtrar docentes en tiempo real
    searchInput.addEventListener("input", function () {
        let searchText = searchInput.value.toLowerCase();
        let filteredDocentes = docentes.filter(docente =>
            docente.ci.includes(searchText) ||
            docente.nombre.toLowerCase().includes(searchText) ||
            docente.telefono.includes(searchText)
        );
        renderDocentes(filteredDocentes);
    });

    // **🚀 Eliminamos completamente cualquier advertencia de salida 🚀**
    window.removeEventListener("beforeunload", () => {});
    if (backButton) {
        backButton.removeEventListener("click", () => {});
    }

    // Cargar los docentes al iniciar la página
    fetchDocentes();
});