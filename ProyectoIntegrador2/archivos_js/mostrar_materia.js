document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("materiaTableBody");
    const searchInput = document.getElementById("searchInput");
    const assignBtn = document.getElementById("assignBtn");
    let materias = [];

    // Función para obtener las materias desde el backend
    function fetchMaterias() {
        
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/mostrar_materia.php")
        //ruta pa leo   
        //fetch("http://localhost/ProyectoIntegrador2/archivos_php/mostrar_materia.php")
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
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="radio" name="materiaSeleccionada" value="${materia.id}"></td>
                <td>${materia.codigo}</td>
                <td>${materia.nombre}</td>
                <td>${materia.facultad}</td>
            `;
            tableBody.appendChild(row);
        });

        // Agregar evento a los radio buttons después de renderizar la tabla
        document.querySelectorAll('input[name="materiaSeleccionada"]').forEach(radio => {
            radio.addEventListener("change", enableAssignButton);
        });
    }

    // Función para habilitar el botón "Asignar" cuando se seleccione una materia
    function enableAssignButton() {
        assignBtn.disabled = false;
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

    // Cargar las materias al iniciar la página
    fetchMaterias();
});