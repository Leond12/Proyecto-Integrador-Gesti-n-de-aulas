<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Datos de conexión
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "aulas_gestion";

// Conectar a la base de datos
$conn = new mysqli($servidor, $usuario, $password, $base_datos);
if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

// Recibir ID de la asignación
$data = json_decode(file_get_contents("php://input"), true);
$idAsignacion = isset($data["id"]) ? intval($data["id"]) : 0;

if ($idAsignacion == 0) {
    echo json_encode(["error" => "ID de asignación inválido"]);
    exit;
}

// Obtener el ID del campo (aula) asociado antes de eliminar la asignación
$sqlGetCampo = "SELECT id_campo FROM Asignado WHERE id = ?";
$stmtGetCampo = $conn->prepare($sqlGetCampo);
$stmtGetCampo->bind_param("i", $idAsignacion);
$stmtGetCampo->execute();
$resultCampo = $stmtGetCampo->get_result();

if ($resultCampo->num_rows > 0) {
    $row = $resultCampo->fetch_assoc();
    $idCampo = $row["id_campo"];

    // Eliminar la asignación
    $sqlDelete = "DELETE FROM Asignado WHERE id = ?";
    $stmtDelete = $conn->prepare($sqlDelete);
    $stmtDelete->bind_param("i", $idAsignacion);
    if ($stmtDelete->execute()) {
        
        // Verificar si el aula sigue estando asignada en otro turno
        $sqlCheck = "SELECT COUNT(*) AS total FROM Asignado WHERE id_campo = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->bind_param("i", $idCampo);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();
        $rowCheck = $resultCheck->fetch_assoc();

        if ($rowCheck["total"] == 0) {
            // No hay más asignaciones para esta aula, actualizar su estado a 'disponible'
            $sqlUpdateCampo = "UPDATE Campo SET estado = 'disponible' WHERE id = ?";
            $stmtUpdateCampo = $conn->prepare($sqlUpdateCampo);
            $stmtUpdateCampo->bind_param("i", $idCampo);
            $stmtUpdateCampo->execute();
        }

        echo json_encode(["success" => "Asignación eliminada y aula actualizada si correspondía"]);
    } else {
        echo json_encode(["error" => "Error al eliminar la asignación"]);
    }

} else {
    echo json_encode(["error" => "No se encontró la asignación"]);
}

$conn->close();
?>
