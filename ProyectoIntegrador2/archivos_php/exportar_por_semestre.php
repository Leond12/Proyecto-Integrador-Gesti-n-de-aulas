<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Obtener y decodificar el cuerpo JSON
$data = json_decode(file_get_contents("php://input"), true);
$semestre = isset($data["semestre"]) ? intval($data["semestre"]) : 0;

if ($semestre !== 1 && $semestre !== 2) {
    echo json_encode(["success" => false, "message" => "Semestre no válido."]);
    exit;
}

// Definir rango de meses por semestre
$mes_inicio = ($semestre === 1) ? 1 : 7;
$mes_final  = ($semestre === 1) ? 6 : 12;

$sql = "
SELECT 
    c.numero AS Campo,
    d.nombre AS Docente,
    m.nombre AS Materia,
    t.nombre AS Turno,
    a.fecha_inicio AS 'Fecha Inicio',
    a.fecha_final AS 'Fecha Final',
    a.descripcion AS Descripción,
    a.requerimientos AS Requerimientos,
    a.dias AS Días,
    u.usuario AS 'Asignado por',
    a.fecha_registro AS 'Fecha de Registro'
FROM Asignado a
INNER JOIN Campo c ON a.id_campo = c.id
INNER JOIN Docente d ON a.id_docente = d.id
INNER JOIN Materia m ON a.id_materia = m.id
INNER JOIN Turno t ON a.id_turno = t.id
INNER JOIN Usuarios u ON a.id_usuario = u.id
WHERE MONTH(a.fecha_inicio) BETWEEN ? AND ?
ORDER BY a.fecha_inicio ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $mes_inicio, $mes_final);
$stmt->execute();
$result = $stmt->get_result();

$datos = [];

$diasMap = [
    "1" => "Lunes",
    "2" => "Martes",
    "3" => "Miércoles",
    "4" => "Jueves",
    "5" => "Viernes",
    "6" => "Sábado"
];

while ($fila = $result->fetch_assoc()) {
    // Mapear días numéricos a nombres
    $diasArray = array_map("trim", explode(",", $fila["Días"]));
    $diasNombres = array_map(function ($dia) use ($diasMap) {
        return $diasMap[$dia] ?? $dia;
    }, $diasArray);
    $fila["Días"] = implode(", ", $diasNombres);
    $datos[] = $fila;
}

echo json_encode([
    "success" => true,
    "datos" => $datos
]);

$stmt->close();
$conn->close();
