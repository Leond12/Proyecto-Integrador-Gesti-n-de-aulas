document.addEventListener("DOMContentLoaded", function () {
    const pisoImagen = document.getElementById("piso-imagen");
    const botonesPiso = document.querySelectorAll(".filter-buttons button");
    const botonesTurno = document.querySelectorAll(".sidebar button");
    const aulasContainer = document.getElementById("aulas-container");

    let turnoSeleccionado = "1"; // Por defecto, se muestra el turno 1
    let pisoSeleccionado = "2"; // Por defecto, se muestra el piso 2

    // Mapeo de imágenes de pisos
    const imagenesPisos = {
        "2": "imagenes/piso2.jpeg",
        "3": "imagenes/piso3.jpeg",
        "4": "imagenes/piso4.jpeg",
        "5": "imagenes/piso5.jpeg",
        "6": "imagenes/piso6.jpeg"
    };

    // Función para actualizar el botón seleccionado
    function actualizarBotonSeleccionado(botones, seleccionado, tipo) {
        botones.forEach(boton => {
            let valor = boton.getAttribute(`data-${tipo}`); // Obtener el valor del atributo data-piso o data-turno
            if (valor === seleccionado) {
                boton.classList.add("btn-seleccionado"); // Agregar clase de botón activo
            } else {
                boton.classList.remove("btn-seleccionado"); // Quitar clase si no está seleccionado
            }
        });
    }

    // Obtener las aulas desde el servidor filtrando por piso y turno
    function obtenerAulas() {
        fetch(`http://localhost/Proyecto-Integrador-Gesti-n-de-aulas/ProyectoIntegrador2/archivos_php/obtener_estados_aulas.php?piso=${encodeURIComponent(pisoSeleccionado)}&turno=${encodeURIComponent(turnoSeleccionado)}`)
            .then(response => response.json())
            .then(data => {
                console.log("Aulas recibidas:", data);
                if (data.error) {
                    aulasContainer.innerHTML = `<p style="color: red; font-weight: bold;">${data.error}</p>`;
                } else {
                    generarAulas(data);
                }
            })
            .catch(error => console.error("Error al obtener las aulas:", error));
    }

    function generarAulas(aulas) {
        aulasContainer.innerHTML = ""; // Limpiar botones anteriores

        if (!aulas || aulas.length === 0) {
            console.log("No se encontraron aulas para este turno y piso.");
            return;
        }

        aulas.forEach(aula => {
            const botonAula = document.createElement("button");
            botonAula.textContent = aula.numero;
            botonAula.classList.add("boton-aula");

            // Aplicar estilos específicos por aula
            botonAula.style.position = "absolute";
            botonAula.style.padding = "10px 15px";
            botonAula.style.width = "80px";
            botonAula.style.height = "40px";
            botonAula.style.border = "none";
            botonAula.style.borderRadius = "5px";
            botonAula.style.pointerEvents = "auto";
            botonAula.style.color = "white";

            // Posicionar en la ubicación específica
            const posiciones = {
                "N200": { top: "15%", left: "7%" },
                "N201": { top: "20%", left: "30%" },
                "N211": { top: "20%", left: "45%" },
                "N212": { top: "30%", left: "60.5%" },
                "N220": { top: "82%", left: "84%" },
                "N221": { top: "10%", left: "84%" },

                "N300": { top: "82%", left: "7%" },
                "N301": { top: "53%", left: "7%" },
                "N302": { top: "4.5%", left: "7%" },
                "NLS": { top: "85%", left: "84%" },

                "N400": { top: "81%", left: "7%" },
                "N401": { top: "49%", left: "7%" },
                "N402": { top: "15%", left: "7%" },
                "N420": { top: "25%", left: "83%" },
                "N421": { top: "72%", left: "83%" },

                "N500": { top: "85%", left: "7%" },
                "N501": { top: "57%", left: "7%" },
                "N502": { top: "30%", left: "7%" },
                "N503": { top: "7%", left: "7%" },
                "N510": { top: "30%", left: "45%" },
                "N520": { top: "80%", left: "83%" },
                "N521": { top: "45%", left: "83%" },
                "N522": { top: "10%", left: "83%" },

                "N600": { top: "87%", left: "66.5%" },
                "N601": { top: "88%", left: "48%" },
                "N602": { top: "89%", left: "31%" },
                "N603": { top: "89%", left: "21%" },
                "N604": { top: "87%", left: "7%" },
                "N605": { top: "38%", left: "7%" },
                "N606": { top: "13%", left: "7%" },
                "N610": { top: "18%", left: "45.5%" },
                "N620": { top: "87%", left: "84%" },
                "N621": { top: "64%", left: "84%" },
                "N622": { top: "13%", left: "84%" },
                "N623": { top: "38%", left: "84%" }
            };

            if (posiciones[aula.numero]) {
                botonAula.style.top = posiciones[aula.numero].top;
                botonAula.style.left = posiciones[aula.numero].left;
            } else {
                botonAula.style.top = "50%";
                botonAula.style.left = "50%";
            }

            // Cambiar el color según el estado del aula
            botonAula.style.backgroundColor = aula.estado === "disponible" ? "green" : "red";

            // Redirigir al hacer clic en el botón del aula
            botonAula.addEventListener("click", function () {
                const turnoSeleccionado = localStorage.getItem("turnoSeleccionado") || "1";
                window.location.href = `campodetalle.html?id=${encodeURIComponent(aula.numero)}&turno=${encodeURIComponent(turnoSeleccionado)}`;
            });

            aulasContainer.appendChild(botonAula);
        });
    }

    // Evento para cambiar de piso y actualizar la imagen
    botonesPiso.forEach(boton => {
        boton.addEventListener("click", function () {
            pisoSeleccionado = this.getAttribute("data-piso"); // Obtener el valor del atributo data-piso
            pisoImagen.src = imagenesPisos[pisoSeleccionado] || "imagenes/piso2.jpeg";
            actualizarBotonSeleccionado(botonesPiso, pisoSeleccionado, "piso"); // Marcar el botón activo
            obtenerAulas();
        });
    });

    // Evento para cambiar de turno y actualizar los botones
    botonesTurno.forEach(boton => {
        boton.addEventListener("click", function () {
            turnoSeleccionado = this.getAttribute("data-turno");
            localStorage.setItem("turnoSeleccionado", turnoSeleccionado);
            actualizarBotonSeleccionado(botonesTurno, turnoSeleccionado, "turno"); // Marcar el botón activo
            obtenerAulas();
        });
    });

    // Cargar las aulas del piso y turno inicial y marcar los botones iniciales
    actualizarBotonSeleccionado(botonesPiso, pisoSeleccionado, "piso");
    actualizarBotonSeleccionado(botonesTurno, turnoSeleccionado, "turno");
    obtenerAulas();
});
