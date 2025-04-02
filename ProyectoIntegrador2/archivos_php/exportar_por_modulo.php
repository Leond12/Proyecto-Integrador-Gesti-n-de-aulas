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
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$semestre = isset($data["semestre"]) ? intval($data["semestre"]) : 0;
$modulo = isset($data["modulo"]) ? intval($data["modulo"]) : -1;

if (!in_array($semestre, [1, 2]) || $modulo < 0 || $modulo > 5) {
    echo json_encode(["success" => false, "message" => "Datos inválidos."]);
    exit;
}

// Calcular mes según semestre y módulo
$mes = ($semestre === 1) ? ($modulo + 1) : ($modulo + 7);

// Buscar asignaciones con fecha_inicio en el mes calculado
$sql = "SELECT 
            c.numero AS aula,
            d.nombre AS docente,
            m.nombre AS materia,
            t.nombre AS turno,
            a.fecha_inicio,
            a.fecha_final,
            a.descripcion,
            a.requerimientos,
            a.fecha_registro,
            u.usuario AS asignador,
            a.dias
        FROM Asignado a
        INNER JOIN Campo c ON a.id_campo = c.id
        INNER JOIN Docente d ON a.id_docente = d.id
        INNER JOIN Materia m ON a.id_materia = m.id
        INNER JOIN Turno t ON a.id_turno = t.id
        INNER JOIN Usuarios u ON a.id_usuario = u.id
        WHERE MONTH(a.fecha_inicio) = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $mes);
$stmt->execute();
$result = $stmt->get_result();

$asignaciones = [];

$diasMap = [
    1 => "Lunes",
    2 => "Martes",
    3 => "Miércoles",
    4 => "Jueves",
    5 => "Viernes",
    6 => "Sábado"
];

while ($row = $result->fetch_assoc()) {
    $diasNombres = "";
    if (!empty($row["dias"])) {
        $dias = explode(",", $row["dias"]);
        $diasTraducidos = array_map(function ($dia) use ($diasMap) {
            $dia = intval(trim($dia));
            return $diasMap[$dia] ?? "";
        }, $dias);
        $diasNombres = implode(", ", array_filter($diasTraducidos));
    }

    $asignaciones[] = [
        "Aula" => $row["aula"],
        "Docente" => $row["docente"],
        "Materia" => $row["materia"],
        "Turno" => $row["turno"],
        "Fecha de Inicio" => $row["fecha_inicio"],
        "Fecha Final" => $row["fecha_final"],
        "Días" => $diasNombres,
        "Requerimientos" => $row["requerimientos"],
        "Descripción" => $row["descripcion"],
        "Fecha de Registro" => $row["fecha_registro"],
        "Asignado por" => $row["asignador"]
    ];
}

echo json_encode(["success" => true, "datos" => $asignaciones]);
$conn->close();
