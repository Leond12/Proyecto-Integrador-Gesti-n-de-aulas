document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("materiaTableBody");
    const searchInput = document.getElementById("searchInput");
    const assignBtn = document.getElementById("assignBtn");
    let materias = [];
    let selectedMateria = localStorage.getItem("materiaSeleccionada") || null; // Ahora solo almacena el nombre

    // Función para obtener las materias desde el backend
    function fetchMaterias() {
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/mostrar_materia.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    materias = data.data;
                    renderMaterias(materias);
                } else {
                    console.error("Error:", data.message);
                    tableBody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
                tableBody.innerHTML = `<tr><td colspan="4">Error al cargar las materias</td></tr>`;
            });
    }

    // Función para renderizar las materias en la tabla
    function renderMaterias(filteredMaterias) {
        tableBody.innerHTML = "";
        filteredMaterias.forEach((materia) => {
            let isSelected = selectedMateria === materia.nombre ? "checked" : "";
            let isDisabled = selectedMateria === materia.nombre ? "disabled" : "";

            let row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="radio" name="materiaSeleccionada" value="${materia.nombre}" ${isSelected} ${isDisabled}></td>
                <td>${materia.codigo}</td>
                <td>${materia.nombre}</td>
                <td>${materia.facultad}</td>
            `;
            tableBody.appendChild(row);
        });

        // Agregar evento a los radio buttons después de renderizar la tabla
        document.querySelectorAll('input[name="materiaSeleccionada"]').forEach(radio => {
            radio.addEventListener("change", handleMateriaSelection);
        });

        // Habilitar el botón asignar si ya había una materia seleccionada
        if (selectedMateria) {
            assignBtn.disabled = false;
        }
    }

    // Función para manejar la selección de materias
    function handleMateriaSelection(event) {
        let newSelectedMateria = event.target.value;

        if (selectedMateria && selectedMateria !== newSelectedMateria) {
            let confirmChange = confirm("¿Desea cambiar de materia?");
            if (!confirmChange) {
                event.target.checked = false; // Desmarcar la nueva selección
                return;
            }
        }

        selectedMateria = newSelectedMateria;
        assignBtn.disabled = false; // Habilitar el botón de asignar
    }

    // Evento para asignar una materia y guardar solo su nombre en localStorage
    assignBtn.addEventListener("click", function () {
        if (selectedMateria) {
            localStorage.setItem("materiaSeleccionada", selectedMateria); // Guarda solo el nombre

            //alert(`Materia asignada correctamente: ${selectedMateria}`);
            disableSelectedMateria(); // Deshabilitar la opción para evitar cambios
        }
    });

    // Función para deshabilitar la opción seleccionada y evitar cambios
    function disableSelectedMateria() {
        document.querySelectorAll('input[name="materiaSeleccionada"]').forEach(radio => {
            if (radio.value === selectedMateria) {
                radio.disabled = true;
            } else {
                radio.disabled = false;
            }
        });
    }

    // Filtrar materias en tiempo real
    searchInput.addEventListener("input", function () {
        let searchText = searchInput.value.toLowerCase();
        let filteredMaterias = materias.filter(materia =>
            materia.codigo.toLowerCase().includes(searchText) ||
            materia.nombre.toLowerCase().includes(searchText) ||
            materia.facultad.toLowerCase().includes(searchText)
        );
        renderMaterias(filteredMaterias);
    });

    // **🚀 Eliminamos completamente cualquier advertencia de salida 🚀**
    window.removeEventListener("beforeunload", () => {});

    // Cargar las materias al iniciar la página
    fetchMaterias();
});
