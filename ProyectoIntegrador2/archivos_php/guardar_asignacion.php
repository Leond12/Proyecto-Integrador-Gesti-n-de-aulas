<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

// Conectar a la base de datos
$conn = new mysqli($servidor, $usuario, $password, $base_datos);
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Recibir datos
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["error" => "No se enviaron datos"]);
    exit;
}

$campo = $data["campo"];
$docente = $data["docente"];
$materia = $data["materia"];
$turno = $data["turno"];
$usuario = $data["usuario"];
$descripcion = $data["descripcion"];
$fecha_inicio = isset($data['fecha_inicio']) ? $data['fecha_inicio'] : null;
$fecha_final = isset($data['fecha_final']) ? $data['fecha_final'] : null;

// Convertir a formato 'YYYY-MM-DD' (evitar que se almacene con hora)
$fecha_inicio = date('Y-m-d', strtotime($fecha_inicio));
$fecha_final = date('Y-m-d', strtotime($fecha_final));


// Obtener el ID del campo
$sql_campo = "SELECT id FROM Campo WHERE numero = ?";
$stmt_campo = $conn->prepare($sql_campo);
$stmt_campo->bind_param("s", $campo);
$stmt_campo->execute();
$result_campo = $stmt_campo->get_result();
if ($result_campo->num_rows == 0) {
    echo json_encode(["error" => "El aula seleccionada no existe"]);
    exit;
}
$id_campo = $result_campo->fetch_assoc()["id"];

// Obtener el ID del docente
$sql_docente = "SELECT id FROM Docente WHERE nombre = ?";
$stmt_docente = $conn->prepare($sql_docente);
$stmt_docente->bind_param("s", $docente);
$stmt_docente->execute();
$result_docente = $stmt_docente->get_result();
if ($result_docente->num_rows == 0) {
    echo json_encode(["error" => "El docente seleccionado no existe"]);
    exit;
}
$id_docente = $result_docente->fetch_assoc()["id"];

// Obtener el ID de la materia
$sql_materia = "SELECT id FROM Materia WHERE nombre = ?";
$stmt_materia = $conn->prepare($sql_materia);
$stmt_materia->bind_param("s", $materia);
$stmt_materia->execute();
$result_materia = $stmt_materia->get_result();
if ($result_materia->num_rows == 0) {
    echo json_encode(["error" => "La materia seleccionada no existe"]);
    exit;
}
$id_materia = $result_materia->fetch_assoc()["id"];


// Insertar la asignación en la tabla `Asignado`
$sql_insert = "INSERT INTO Asignado (id_campo, id_docente, id_materia, id_turno, id_usuario, descripcion, fecha_inicio, fecha_final) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("iiiiisss", $id_campo, $id_docente, $id_materia, $turno, $usuario, $descripcion, $fecha_inicio, $fecha_final);

if ($stmt_insert->execute()) {
    // Marcar el aula como "ocupado"
    $sql_update = "UPDATE Campo SET estado = 'ocupado' WHERE id = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("i", $id_campo);
    $stmt_update->execute();

    echo json_encode(["success" => "Asignación guardada correctamente y aula marcada como ocupada"]);
} else {
    echo json_encode(["error" => "Error al guardar la asignación"]);
}

// Cerrar conexiones

$conn->close();
?>
