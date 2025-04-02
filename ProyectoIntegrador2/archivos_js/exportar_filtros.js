// exportar_filtros.js

// Referencias a contenedores
const contenedorPrincipal = document.querySelector(".menu-container");

// Crear vistas específicas (inicialmente ocultas)
const vistaAula = document.createElement("div");
vistaAula.className = "vista";
vistaAula.id = "vista-aula";
vistaAula.style.display = "none";
vistaAula.innerHTML = `
    <h2>Buscar por Campo</h2>
    <div>
    <input type="text" placeholder="Ingrese nombre del campo..." class="form-control" id="input-aula">
    <button id="btn-exportar-aula"class="btn btn-ex">Exportar Asignaciones</button>
    </div>
    <button onclick="volverMenu()" class="btn btn-secondary mt-3">Volver</button>
`;
document.body.appendChild(vistaAula);

const vistaModulo = document.createElement("div");
vistaModulo.className = "vista";
vistaModulo.id = "vista-modulo";
vistaModulo.style.display = "none";
vistaModulo.innerHTML = `
    <h2>Filtrar por Semestre y Módulo</h2>
    <div style="display: flex; gap: 40px;">
        <div>
            <label><input type="checkbox" name="semestre" value="1"> 1er semestre</label><br>
            <label><input type="checkbox" name="semestre" value="2"> 2do semestre</label>
        </div>
        <div>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="0">Mod 0</button>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="1">Mod 1</button>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="2">Mod 2</button>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="3">Mod 3</button>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="4">Mod 4</button>
            <button class="btn btn-outline-primary mb-2 btn-modulo" data-modulo="5">Mod 5</button>
        </div>
    </div>
    <button onclick="volverMenu()" class="btn btn-secondary mt-3">Volver</button>
`;
document.body.appendChild(vistaModulo);

const vistaSemestre = document.createElement("div");
vistaSemestre.className = "vista";
vistaSemestre.id = "vista-semestre";
vistaSemestre.style.display = "none";
vistaSemestre.innerHTML = `
    <h2>Asignaciones por Semestre</h2>
    <button class="btn btn-info d-block mb-2">Semestre 1</button>
    <button class="btn btn-info d-block">Semestre 2</button>
    <button onclick="volverMenu()" class="btn btn-secondary mt-3">Volver</button>
`;
document.body.appendChild(vistaSemestre);

// Funciones para mostrar vistas
function mostrarVista(id) {
    contenedorPrincipal.style.display = "none";
    document.getElementById("vista-aula").style.display = "none";
    document.getElementById("vista-modulo").style.display = "none";
    document.getElementById("vista-semestre").style.display = "none";

    document.getElementById(id).style.display = "block";
}

// Función para volver al menú principal de exportación
function volverMenu() {
    contenedorPrincipal.style.display = "block";
    vistaAula.style.display = "none";
    vistaModulo.style.display = "none";
    vistaSemestre.style.display = "none";
}
