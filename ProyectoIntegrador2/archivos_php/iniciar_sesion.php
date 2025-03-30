<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = isset($_POST["usuario"]) ? trim($_POST["usuario"]) : "";
    $contrasena = isset($_POST["contrasena"]) ? trim($_POST["contrasena"]) : "";

    if (!empty($usuario) && !empty($contrasena)) {
        $stmt = $conn->prepare("SELECT usuarios.id, usuarios.usuario, usuarios.contraseña, roles.rol 
                                FROM usuarios 
                                JOIN roles ON usuarios.id_rol = roles.id 
                                WHERE usuarios.usuario = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            
            // Comparar la contraseña (asumiendo que está en texto plano, pero debería estar encriptada con password_hash)
            if ($contrasena === $row["contraseña"]) {
                echo json_encode(["success" => true, "nombre" => $row["usuario"], "rol" => $row["rol"]]);
            } else {
                echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido."]);
}

$conn->close();
?>