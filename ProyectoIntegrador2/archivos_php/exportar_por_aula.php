<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$aula = trim($data["aula"] ?? "");

if (empty($aula)) {
    echo json_encode(["success" => false, "message" => "Debe ingresar un aula."]);
    exit;
}

$sql = "SELECT 
            c.numero AS aula, 
            d.nombre AS docente, 
            m.nombre AS materia, 
            t.nombre AS turno, 
            a.fecha_inicio, 
            a.fecha_final, 
            a.descripcion,
            a.requerimientos,
            a.dias,
            a.fecha_registro,
            u.usuario AS usuario_asignador
        FROM Asignado a
        INNER JOIN Campo c ON a.id_campo = c.id
        INNER JOIN Docente d ON a.id_docente = d.id
        INNER JOIN Materia m ON a.id_materia = m.id
        INNER JOIN Turno t ON a.id_turno = t.id
        INNER JOIN Usuarios u ON a.id_usuario = u.id
        WHERE c.numero = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $aula);
$stmt->execute();
$result = $stmt->get_result();

$datos = [];

while ($row = $result->fetch_assoc()) {
    // Mapear días
    if (!empty($row["dias"])) {
        $mapa_dias = [
            "1" => "Lunes",
            "2" => "Martes",
            "3" => "Miércoles",
            "4" => "Jueves",
            "5" => "Viernes",
            "6" => "Sábado"
        ];
        $ids = explode(",", $row["dias"]);
        $nombres_dias = array_map(fn($id) => $mapa_dias[trim($id)] ?? "Desconocido", $ids);
        $row["dias"] = implode(", ", $nombres_dias);
    }
    $datos[] = $row;
}

if (empty($datos)) {
    echo json_encode(["success" => false, "message" => "No se encontró ninguna asignación para el aula proporcionada."]);
} else {
    echo json_encode(["success" => true, "datos" => $datos]);
}

$conn->close();
?>
