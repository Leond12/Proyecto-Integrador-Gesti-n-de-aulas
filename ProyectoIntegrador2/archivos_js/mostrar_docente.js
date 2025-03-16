document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("docenteTableBody");
    const searchInput = document.getElementById("searchInput");
    const assignBtn = document.getElementById("assignBtn");
    let docentes = [];

    // Función para obtener los docentes desde el backend
    function fetchDocentes() {
        fetch("http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/mostrar_docente.php")
        //ruta anterior
        //fetch("http://localhost/ProyectoIntegrador2/archivos_php/mostrar_docente.php")
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
            let row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="radio" name="docenteSeleccionado" value="${docente.ci}"></td>
                <td>${docente.ci}</td>
                <td>${docente.nombre}</td>
                <td>${docente.telefono}</td>
            `;
            tableBody.appendChild(row);
        });

        // Agregar evento a los radio buttons después de renderizar la tabla
        document.querySelectorAll('input[name="docenteSeleccionado"]').forEach(radio => {
            radio.addEventListener("change", enableAssignButton);
        });
    }

    // Función para habilitar el botón "Asignar" cuando se seleccione un docente
    function enableAssignButton() {
        assignBtn.disabled = false;
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

    // Cargar los docentes al iniciar la página
    fetchDocentes();
});