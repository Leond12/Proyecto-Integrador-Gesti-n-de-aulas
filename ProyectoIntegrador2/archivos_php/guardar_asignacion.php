<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Obtener y decodificar los datos enviados en JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar campos obligatorios
$campos_requeridos = ["campo", "docente", "materia", "turno", "usuario", "descripcion", "fecha_inicio", "fecha_final","requerimientos","dias"];
foreach ($campos_requeridos as $campo) {
    if (!isset($data[$campo]) || empty($data[$campo])) {
        echo json_encode(["error" => "El campo '$campo' es obligatorio."]);
        exit;
    }
}

// Recolectar datos
$numero_campo = $data["campo"];
$nombre_docente = $data["docente"];
$nombre_materia = $data["materia"];
$id_turno = $data["turno"];
$id_usuario = $data["usuario"];
$descripcion = $data["descripcion"];
$requerimientos = isset($data["requerimientos"]) ? $data["requerimientos"] : "";
$dias = isset($data["dias"]) ? $data["dias"] : "";
$fecha_inicio = $data["fecha_inicio"];
$fecha_final = $data["fecha_final"];

// Obtener el ID real del campo por su número
$stmtCampo = $conn->prepare("SELECT id FROM Campo WHERE numero = ?");
$stmtCampo->bind_param("s", $numero_campo);
$stmtCampo->execute();
$resultCampo = $stmtCampo->get_result();
if ($resultCampo->num_rows === 0) {
    echo json_encode(["error" => "No se encontró el campo especificado."]);
    exit;
}
$id_campo = $resultCampo->fetch_assoc()["id"];
$stmtCampo->close();


// Buscar ID del docente
$stmtDocente = $conn->prepare("SELECT id FROM Docente WHERE nombre = ?");
$stmtDocente->bind_param("s", $nombre_docente);
$stmtDocente->execute();
$resultDocente = $stmtDocente->get_result();
if ($resultDocente->num_rows === 0) {
    echo json_encode(["error" => "No se encontró el docente especificado."]);
    exit;
}
$id_docente = $resultDocente->fetch_assoc()["id"];
$stmtDocente->close();

// Buscar ID de la materia
$stmtMateria = $conn->prepare("SELECT id FROM Materia WHERE nombre = ?");
$stmtMateria->bind_param("s", $nombre_materia);
$stmtMateria->execute();
$resultMateria = $stmtMateria->get_result();
if ($resultMateria->num_rows === 0) {
    echo json_encode(["error" => "No se encontró la materia especificada."]);
    exit;
}
$id_materia = $resultMateria->fetch_assoc()["id"];
$stmtMateria->close();

// Insertar la asignación
$stmtInsert = $conn->prepare("INSERT INTO Asignado (id_campo, id_docente, id_materia, id_turno, id_usuario, descripcion, requerimientos, dias, fecha_inicio, fecha_final) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmtInsert->bind_param("iiiiisssss", $id_campo, $id_docente, $id_materia, $id_turno, $id_usuario, $descripcion, $requerimientos, $dias, $fecha_inicio, $fecha_final);

if ($stmtInsert->execute()) {
    // Cambiar el estado del campo a "ocupado"
    $stmtEstado = $conn->prepare("UPDATE Campo SET estado = 'ocupado' WHERE id = ?");
    $stmtEstado->bind_param("i", $id_campo);
    $stmtEstado->execute();
    $stmtEstado->close();

    echo json_encode(["success" => "Asignación registrada exitosamente."]);
} else {
    echo json_encode(["error" => "Error al registrar la asignación: " . $stmtInsert->error]);
}

$stmtInsert->close();
$conn->close();
