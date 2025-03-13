document.addEventListener("DOMContentLoaded", function () {
    const pisoImagen = document.getElementById("piso-imagen");
    const botonesPiso = document.querySelectorAll(".filter-buttons button");
    const aulasContainer = document.getElementById("aulas-container");

    // Mapeo de pisos a imágenes
    const imagenesPisos = {
        "Piso 2": "imagenes/piso2.jpeg",
        "Piso 3": "imagenes/piso3.jpeg",
        "Piso 4": "imagenes/piso4.jpeg",
        "Piso 5": "imagenes/piso5.jpeg",
        "Piso 6": "imagenes/piso6.jpeg"
    };

    // Mapeo de aulas por piso con posiciones fijas
    const aulasPorPiso = {
        "Piso 2": [
            { nombre: "N-200", top: "15%", left: "7%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" },
            { nombre: "N-201", top: "20%", left: "30%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" },
            { nombre: "N-211", top: "20%", left: "45%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" },
            { nombre: "N-212", top: "30%", left: "60.5%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" },
            { nombre: "N-220", top: "82%", left: "84%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" },
            { nombre: "N-221", top: "10%", left: "84%",color: "#gray", width: "100px", height: "40px", background: "#5ce247" }
        ],
        "Piso 3": [
            { nombre: "N-300", top: "82%", left: "7%" },
            { nombre: "N-301", top: "53%", left: "7%" },
            { nombre: "N-302", top: "4.5%", left: "7%" },
            { nombre: "NLS", top: "85%", left: "84%" },
            { nombre: "NLS", top: "55%", left: "84%" }
        ],
        "Piso 4": [
            { nombre: "N-400", top: "81%", left: "7%" },
            { nombre: "N-401", top: "49%", left: "7%" },
            { nombre: "N-402", top: "15%", left: "7%" },
            { nombre: "N-420", top: "25%", left: "83%" },
            { nombre: "N-421", top: "72%", left: "83%" }
        ],
        "Piso 5": [
            { nombre: "N-500", top: "85%", left: "7%" },
            { nombre: "N-501", top: "57%", left: "7%" },
            { nombre: "N-502", top: "30%", left: "7%" },
            { nombre: "N-503", top: "7%", left: "7%" },
            { nombre: "N-510", top: "30%", left: "45%" },
            { nombre: "N-520", top: "80%", left: "83%" },
            { nombre: "N-521", top: "45%", left: "83%" },
            { nombre: "N-522", top: "10%", left: "83%" }
        ],
        "Piso 6": [
            { nombre: "N-600", top: "87%", left: "66.5%" },
            { nombre: "N-601", top: "88%", left: "48%" },
            { nombre: "N-602", top: "89%", left: "31%" },
            { nombre: "N-603", top: "89%", left: "21%" },
            { nombre: "N-604", top: "87%", left: "7%" },
            { nombre: "N-605", top: "38%", left: "7%" },
            { nombre: "N-606", top: "13%", left: "7%" },
            { nombre: "N-610", top: "18%", left: "45.5%" },
            { nombre: "N-620", top: "87%", left: "84%" },
            { nombre: "N-621", top: "64%", left: "84%" },
            { nombre: "N-622", top: "13%", left: "84%" },
            { nombre: "N-623", top: "38%", left: "84%" }
        ]
    };

    botonesPiso.forEach(boton => {
        boton.addEventListener("click", function () {
            const textoBoton = this.textContent.trim();
            
            // Cambiar imagen de piso
            if (imagenesPisos[textoBoton]) {
                pisoImagen.src = imagenesPisos[textoBoton];
            }

            // Generar botones de aulas en posiciones específicas
            generarAulas(textoBoton);
        });
    });

    function generarAulas(piso) {
        aulasContainer.innerHTML = ""; // Limpiar botones anteriores
    
        if (!aulasPorPiso[piso]) return; // Si no hay aulas para este piso, salir
    
        aulasPorPiso[piso].forEach(aula => {
            const botonAula = document.createElement("button");
            botonAula.textContent = aula.nombre;
            botonAula.classList.add("boton-aula");
    
            // Aplicar estilos específicos por aula
            botonAula.style.position = "absolute";
            botonAula.style.top = aula.top;
            botonAula.style.left = aula.left;
            botonAula.style.padding = "10px 15px";
            botonAula.style.width = aula.width;
            botonAula.style.height = aula.height;
            botonAula.style.border = "none";
            botonAula.style.background = aula.background;
            botonAula.style.color = aula.color;
            botonAula.style.fontWeight = "bold";
            botonAula.style.borderRadius = "5px";
            botonAula.style.pointerEvents = "auto";
    
            // Redirigir al hacer clic en el botón del aula
            botonAula.addEventListener("click", function () {
                window.location.href = `campodetalle.html?id=${aula.nombre.replace("-", "")}`;
            });
    
            aulasContainer.appendChild(botonAula);
        });
    }
    
    
    

    // Inicializa el primer piso con sus aulas en posiciones específicas
    generarAulas("Piso 2");
});
