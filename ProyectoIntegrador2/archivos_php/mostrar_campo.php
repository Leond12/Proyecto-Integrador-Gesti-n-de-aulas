<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Verificar si se proporcionó un ID
if (!isset($_GET["campoId"])) {
    echo json_encode(["error" => "No se proporcionó un ID"]);
    exit;
}

$id = $_GET["campoId"];


// Convertir el ID en formato compatible (eliminar guiones si existen)
$id = str_replace("-", "", $id);

// Consulta a la base de datos
$sql = "SELECT * FROM Campo WHERE REPLACE(numero, '-', '') = REPLACE(?, '-', '')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $campo = $result->fetch_assoc();
    echo json_encode($campo);
} else {
    echo json_encode(["error" => "Campo no encontrado"]);
}

// Cerrar conexión
$conn->close();
?>
