<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
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

// Verificar si se proporcionó un piso y un turno
if (!isset($_GET["piso"]) || !isset($_GET["turno"])) {
    echo json_encode(["error" => "No se proporcionó un piso o turno"]);
    exit;
}

$piso = intval($_GET["piso"]);
$turno = intval($_GET["turno"]);

// Consulta mejorada para asegurar que devuelve TODAS las aulas del piso y turno seleccionado
$sql = "SELECT numero, estado FROM Campo WHERE piso = ? AND id_turno = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $piso, $turno);
$stmt->execute();
$result = $stmt->get_result();

$aulas = [];
while ($row = $result->fetch_assoc()) {
    $aulas[] = $row;
}

// Verificar si se encontraron datos antes de enviarlos
if (empty($aulas)) {
    echo json_encode(["error" => "No se encontraron aulas para este piso y turno"]);
} else {
    echo json_encode($aulas);
}

// Cerrar conexión
$conn->close();
?>
