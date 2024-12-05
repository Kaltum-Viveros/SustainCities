<?php
session_start(); // Asegúrate de que la sesión esté iniciada

$nombre = $_SESSION['nombre'];
$id_ciudad = $_SESSION['id_ciudad'];
$primer_nombre = explode(' ', $nombre)[0];

require_once '../backend/myapi/DataBase.php';
use SustainCities\backend\myapi\DataBase;

class CiudadQuery extends DataBase {
    public function __construct() {
        parent::__construct('sustaincities');
    }

    public function obtenerCiudad($id_ciudad) {
        $query = "SELECT nombre FROM ciudades WHERE id_ciudad = ?";
        $stmt = $this->conexion->prepare($query);

        if (!$stmt) {
            throw new \Exception('Error preparando la consulta: ' . $this->conexion->error);
        }

        $stmt->bind_param("i", $id_ciudad);
        $stmt->execute();

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return $result->fetch_assoc()['nombre'];
        }

        return "Ciudad desconocida";
    }
}

try {
    $ciudadQuery = new CiudadQuery();
    $ciudad = $ciudadQuery->obtenerCiudad($id_ciudad);
} catch (\Exception $e) {
    die("Error al obtener la ciudad: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SustainCities | Foro</title>
    <link href="estilos-foro.css" rel="stylesheet" >
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="sidebar">
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="resources/img/logoSCsolo.png" alt="logo">
                <h2>SustainCities</h2>
            </div>
            <ul class="sidebar-links">
                <h4>
                    <span>Menú</span>
                    <div class="menu-separator"></div>
                </h4>
                <li>
                    <a id="inicio">
                        <i class='bx bxs-home'></i>
                        Inicio
                    </a>
                </li>
                <li>
                    <a id="misPost">
                        <i class='bx bxs-plus-square' ></i>
                        Mis Posts
                    </a>
                </li>
                <li>
                <a href="http://localhost/SustainCities/frontend/login-registro.html">
                        <i class='bx bx-log-out bx-rotate-180' ></i>
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
            <div class="user-account">
                <div class="user-profile">
                    <i class='bx bxs-user-circle' ></i>
                    <div class="user-detail">
                        <h3><?php echo $primer_nombre?></h3>
                        <span><?php echo $ciudad?></span>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <div class="main-content">
        <!-- Barra de búsqueda -->
        
        <!-- Área de publicaciones -->
        <div id="contenedor">

        </div>

    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="foro.js"></script>
</ht>