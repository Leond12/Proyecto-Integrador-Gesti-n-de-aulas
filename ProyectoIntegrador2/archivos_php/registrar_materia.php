<?php
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

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $codigo = isset($_POST["codigo"]) ? trim($_POST["codigo"]) : "";
    $nombre = isset($_POST["nombre"]) ? trim($_POST["nombre"]) : "";
    $id_facultad = isset($_POST["facultad"]) ? trim($_POST["facultad"]) : "";

    if (!empty($codigo) && !empty($nombre) && !empty($id_facultad)) {
        $stmt = $conn->prepare("INSERT INTO materia (codigo, nombre, id_facultad) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $codigo, $nombre, $id_facultad);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Error en la consulta: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido"]);
}

$conn->close();
?>