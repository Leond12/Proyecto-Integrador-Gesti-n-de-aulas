<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ci_docente = isset($_POST["ci_docente"]) ? trim($_POST["ci_docente"]) : "";
    $nombre_docente = isset($_POST["nombre_docente"]) ? trim($_POST["nombre_docente"]) : "";
    $telefono = isset($_POST["telefono"]) ? trim($_POST["telefono"]) : "";

    if (!empty($ci_docente) && !empty($nombre_docente) && !empty($telefono)) {
        $stmt = $conn->prepare("INSERT INTO docente (ci, nombre, telefono) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $ci_docente, $nombre_docente, $telefono);

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

