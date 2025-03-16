<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Habilitar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Consultar las materias con su respectiva facultad
$sql = "SELECT materia.id, materia.codigo, materia.nombre, facultad.nombre AS facultad
        FROM materia
        JOIN facultad ON materia.id_facultad = facultad.id";
$result = $conn->query($sql);

$materias = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $materias[] = $row;
    }
    echo json_encode(["success" => true, "data" => $materias]);
} else {
    echo json_encode(["success" => false, "message" => "No se encontraron materias"]);
}

$conn->close();
?>
