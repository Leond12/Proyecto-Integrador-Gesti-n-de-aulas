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

// Verificar si se proporcionó un ID y un turno
if (!isset($_GET["id"]) || !isset($_GET["turno"])) {
    echo json_encode(["error" => "No se proporcionó un ID de aula o turno"]);
    exit;
}

$id = $_GET["id"];
$turno = intval($_GET["turno"]);

// Consulta a la base de datos para obtener los detalles del aula en el turno seleccionado
$sql = "SELECT * FROM Campo WHERE numero = ? AND id_turno = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $id, $turno);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $campo = $result->fetch_assoc();
    echo json_encode($campo);
} else {
    echo json_encode(["error" => "No se encontró el aula en este turno"]);
}

// Cerrar conexión
$conn->close();
?>
