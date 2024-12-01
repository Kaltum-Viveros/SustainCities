

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
                        <h3>primer_nombre</h3>
                        <span>ciudad</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <div class="main-content">
        <!-- Barra de búsqueda -->
        <div class="search-bar">
            <input type="text" placeholder="Buscar en el foro..." id="search">
            <button id="search-button"><i class='bx bx-search'></i></button>
        </div>

        <!-- Área de publicaciones -->
        <div id="contenedor">

        </div>

    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="foro.js"></script>
</ht>