<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

$sql = "SELECT id, nombre FROM facultad";
$result = $conn->query($sql);

$facultades = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $facultades[] = $row;
    }
}

echo json_encode(["success" => true, "data" => $facultades]);

$conn->close();
?>
