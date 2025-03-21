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

// Obtener el término de búsqueda
$query = isset($_GET["query"]) ? trim($_GET["query"]) : "";

// Validar que la consulta no esté vacía
if (empty($query)) {
    echo json_encode([]);
    exit;
}

// Consulta SQL para buscar en la tabla Asignado y sus relaciones
$sql = "SELECT a.id, c.numero AS campo, d.nombre AS docente, m.nombre AS materia, t.nombre AS turno
        FROM Asignado a
        INNER JOIN Campo c ON a.id_campo = c.id
        INNER JOIN Docente d ON a.id_docente = d.id
        INNER JOIN Materia m ON a.id_materia = m.id
        INNER JOIN Turno t ON a.id_turno = t.id
        WHERE c.numero LIKE ? OR d.nombre LIKE ? OR m.nombre LIKE ? OR t.nombre LIKE ?";

$stmt = $conn->prepare($sql);
$searchTerm = "%$query%";
$stmt->bind_param("ssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm);
$stmt->execute();
$result = $stmt->get_result();

$asignaciones = [];

while ($row = $result->fetch_assoc()) {
    $asignaciones[] = $row; // ✅ Asegurar que `id` está incluido en cada resultado
}

echo json_encode($asignaciones);

?>
