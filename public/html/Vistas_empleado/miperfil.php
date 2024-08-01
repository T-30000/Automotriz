<?php
header('Content-Type: application/json');

// Supongamos que tienes una conexión a la base de datos establecida
include('db_connection.php');

// Reemplaza con la lógica para obtener el ID del usuario logueado
$userId = $_SESSION['user_id']; 

// Consulta a la base de datos
$sql = "SELECT first_name, last_name, registration_number, image FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$response = array();
if ($user) {
    $response['success'] = true;
    $response['profile'] = array(
        'firstName' => $user['first_name'],
        'lastName' => $user['last_name'],
        'registrationNumber' => $user['registration_number'],
        'image' => $user['image']
    );
} else {
    $response['success'] = false;
}

echo json_encode($response);
?>
