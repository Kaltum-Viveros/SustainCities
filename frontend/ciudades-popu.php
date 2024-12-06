<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "changocome";
$dbname = "sustaincities";

$conn = new mysqli($servername, $username, $password, $dbname, 3307);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL
$sql = "
    SELECT
        ciudad,
        COUNT(id_post) AS num_aportaciones
    FROM
        vista_posts_usuario
    WHERE
        eliminado = 0
    GROUP BY
        ciudad
    ORDER BY
        num_aportaciones DESC
    LIMIT 5;
";

$result = $conn->query($sql);

$ciudades = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $ciudades[] = $row; // Guarda cada fila como un elemento del arreglo
    }
}

$conn->close();

// Devuelve los datos en formato JSON
echo json_encode($ciudades);
?>
