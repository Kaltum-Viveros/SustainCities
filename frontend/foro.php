<?php
session_start(); // Asegúrate de que la sesión esté iniciada
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
                    <a href="#">
                        <i class='bx bxs-home'></i>
                        Inicio
                    </a>
                </li>
                <li>   
                    <a href="#">
                        <i class='bx bxs-plus-square' ></i>
                        Mis Posts
                    </a>
                </li>
                <li>   
                    <a href="http://localhost/SustainCities/frontend/index.html">
                        <i class='bx bx-log-out bx-rotate-180' ></i>
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
            <div class="user-account">
                <div class="user-profile">
                    <i class='bx bxs-user-circle' ></i>
                    <div class="user-detail">
                        <h3><?php echo isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'Nombre del User'; ?></h3>
                        <span>Estado</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="../backend/login-registro.js"></script>
</html>