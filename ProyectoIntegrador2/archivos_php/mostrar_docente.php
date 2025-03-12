<?php
// Habilitar reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar la respuesta como JSON
header('Content-Type: application/json');

// Conexión a la base de datos
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

// Consultar los docentes
$sql = "SELECT ci, nombre, telefono FROM docente";
$result = $conn->query($sql);

$docentes = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $docentes[] = $row;
    }
    echo json_encode(["success" => true, "data" => $docentes]);
} else {
    echo json_encode(["success" => false, "message" => "No se encontraron docentes"]);
}

$conn->close();
?>