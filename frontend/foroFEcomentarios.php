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
                        <h3>Juan Perez</h3>
                        <span>Cordoba</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <div class="main-content">
        <!-- Área de publicaciones -->
        <div id="contenedor">
        <!-- Ajax comentarios -->
            <div class="post">
                <div class="post-image">
                    <img src="resources/img/logoSCsolo.png" width=250px>
                </div>

                <div class="post-content">
                    <div class="post-header">
                        <i class='bx bx-user-circle' ></i>
                        <div class="user-details">
                            <h4>Juan Perez</h4>
                            <p>Cordoba , Veracruz</p>
                        </div>
                    </div>

                    <div class="post-text" id="post-text">
                        <h4>Titulo Post</h4>
                        <p>Post Contenido</p>
                        <div class="post-meta">
                            <span><i class='bx bx-calendar' ></i> 2024-12-01 23:22:18</span>
                            <div class="meta-post-button">
                                <span><i id="likes" class='bx bx-like' ></i> 0</span>
                                <span><i id="comentarios" class='bx bx-chat'></i> 0</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <h3>Comentarios</h3>
            
            <div class="post" id="comentario">
                    <div class="post-header">
                        <i class='bx bx-user-circle' ></i>
                        <div class="user-details" id="comment-details">
                            <h4>Juan Perez</h4>
                            <p>Cordoba , Veracruz</p>
                        </div>
                    </div>
                <div class="comment-text" id="comment-text">
                    <p>Curabitur sed viverra lorem. Vestibulum luctus condimentum sem, quis congue mi condimentum a. Integer a auctor odio. Praesent urna metus, auctor et tempus sed, suscipit vel elit. Nunc varius volutpat tortor eget maximus. Morbi varius, elit at congue aliquam, lorem ipsum vehicula odio, ac scelerisque arcu nulla efficitur mauris. Pellentesque elementum orci ut ante consequat lacinia. Nulla sit amet dignissim lacus. Nullam faucibus suscipit augue condimentum ornare. Aliquam ac nibh quis nunc mattis consequat.</p>
                    <div class="post-meta">
                        <span><i class='bx bx-calendar'></i> 2024-12-01 23:22:18</span>
                    </div>
                </div>  
            </div>
        </div>

        <footer class="search-bar">
            <input type="text" placeholder="Escribe aquí tu comentario..." id="search-start">
            <button id="search-button"><i class='bx bxs-send'></i></button>
        </footer>

    </div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script></script>
</ht>