<?php
$servername = "localhost"; // Cambia esto si tu servidor MySQL no está en el mismo servidor
$username = "root"; // Usuario de MySQL
$password = ""; // Contraseña de MySQL
$dbname = "dreamart_db"; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
