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

$idAsignacion = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

if ($idAsignacion == 0) {
    echo json_encode(["error" => "ID de asignación inválido"]);
    exit;
}

$sql = "SELECT 
            c.numero AS campo, 
            d.nombre AS docente, 
            m.nombre AS materia, 
            t.nombre AS turno,
            a.fecha_inicio, 
            a.fecha_final,
            a.descripcion,
            a.requerimientos,
            a.dias -- ✅ Ahora incluye la descripción
        FROM Asignado a
        INNER JOIN Campo c ON a.id_campo = c.id
        INNER JOIN Docente d ON a.id_docente = d.id
        INNER JOIN Materia m ON a.id_materia = m.id
        INNER JOIN Turno t ON a.id_turno = t.id
        WHERE a.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idAsignacion);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // 🟦 Traducir IDs de días a texto
    if (!empty($row["dias"])) {
        $dias_ids = explode(",", $row["dias"]);
        $mapa_dias = [
            "1" => "Lunes",
            "2" => "Martes",
            "3" => "Miércoles",
            "4" => "Jueves",
            "5" => "Viernes",
            "6" => "Sábado",
            "7" => "Domingo"
        ];

        $dias_nombres = array_map(function($id) use ($mapa_dias) {
            return $mapa_dias[trim($id)] ?? "Desconocido";
        }, $dias_ids);

        $row["dias"] = implode(", ", $dias_nombres);
    } else {
        $row["dias"] = "No especificado";
    }

    echo json_encode($row);
} else {
    echo json_encode(["error" => "Asignación no encontrada"]);
}


$conn->close();
?>
