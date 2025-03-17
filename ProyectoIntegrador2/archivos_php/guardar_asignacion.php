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

// Verificar si se recibieron todos los datos necesarios
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["campo"], $data["docente"], $data["materia"], $data["turno"], $data["usuario"], $data["fecha_inicio"], $data["fecha_final"])) {
    echo json_encode(["error" => "Faltan datos en la solicitud"]);
    exit;
}

$campo = $data["campo"];
$docente = $data["docente"];
$materia = $data["materia"];
$turno = $data["turno"];
$usuario = $data["usuario"];
$fecha_inicio = $data["fecha_inicio"];
$fecha_final = $data["fecha_final"];
$descripcion = isset($data["descripcion"]) ? $data["descripcion"] : "";

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
$row_campo = $result_campo->fetch_assoc();
$id_campo = $row_campo["id"];

// Insertar la asignación en la tabla `Asignado`
$sql_insert = "INSERT INTO Asignado (id_campo, id_docente, id_materia, id_turno, id_usuario, descripcion, fecha_inicio, fecha_final) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("iiiiisss", $id_campo, $docente, $materia, $turno, $usuario, $descripcion, $fecha_inicio, $fecha_final);

if ($stmt_insert->execute()) {
    // Actualizar el estado del aula a "ocupado"
    $sql_update = "UPDATE Campo SET estado = 'ocupado' WHERE id = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("i", $id_campo);
    $stmt_update->execute();

    echo json_encode(["success" => "Asignación guardada correctamente y aula marcada como ocupada"]);
} else {
    echo json_encode(["error" => "Error al guardar la asignación"]);
}

// Cerrar conexiones
$stmt_insert->close();
$stmt_campo->close();
$stmt_update->close();
$conn->close();
?>
