<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "changocome";
$dbname = "sustaincities";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) AS TotalPosts FROM usuarios";
$result = $conn->query($sql);


$totalPosts = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $totalPosts = $row['TotalPosts'];
}

echo $totalPosts;

$conn->close();
?>