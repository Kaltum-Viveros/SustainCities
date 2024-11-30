$(document).ready(function () {
    seccionInicio();

    function seccionInicio() {
        let template_bar = `
            <div class="posts-section">
                <div class="post">
                    <div class="post-content">
                        <h3>Título de la Publicación</h3>
                        <p>Contenido breve de la publicación...</p>
                        <div class="post-meta">
                            <span>Autor: Usuario1</span>
                            <span>Fecha: 2024-11-30</span>
                        </div>
                    </div>
                    <div class="post-image">
                        <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                    </div>
                </div>

                <div class="post">
                    <div class="post-content">
                        <h3>Otra Publicación</h3>
                        <p>Contenido breve de otra publicación...</p>
                        <div class="post-meta">
                            <span>Autor: Usuario2</span>
                            <span>Fecha: 2024-11-29</span>
                        </div>
                    </div>
                    <div class="post-image">
                        <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                    </div>
                </div>
            </div>
        `;

        let contenedor = document.getElementById("contenedor");
        if (contenedor) {
            contenedor.innerHTML = template_bar;
        } else {
            console.error("Element with ID 'contenedor' not found.");
        }
    }

    $(document).on('click', '#inicio', function() {
        $.ajax({
            url: 'foroprueba.php',
            success: seccionInicio()
        });
    });

    $(document).on('click', '#misPost', function() {
        $.ajax({
            url: 'foroprueba.php',
            success: function() {
                let template_bar = `
                    <div class="content-container">
                        <div class="form-section">
                            <h3>Crear Post</h3>
                            <form action="create_post.php" method="POST" enctype="multipart/form-data">
                                <input type="text" name="title" placeholder="Título del post" required>
                                <textarea name="content" rows="5" placeholder="Escribe tu post aquí..." required></textarea>
                                <!-- Sección para subir imágenes (0, 1 o muchas) -->
                                <label for="images">Sube imágenes (opcional):</label>
                                <input type="file" name="images[]" accept="image/*" multiple>
                                <button type="submit">Publicar</button>
                            </form>
                        </div>

                        <!-- Sección de posts -->
                        <div class="posts-section">
                            <h3>Mis Posts</h3>
                            <!-- Ejemplo de publicaciones con o sin imagen -->
                            <div class="post">
                                <div class="post-content">
                                    <h4>Post de Ejemplo 1</h4>
                                    <p>Contenido del post 1...</p>
                                    <span>Fecha: 2024-11-30</span>
                                </div>
                                <div class="post-buttons">
                                    <form action="edit_post.php" method="GET">
                                        <input type="hidden" name="id" value="1">
                                        <button type="submit">Editar</button>
                                    </form>
                                    <form action="delete_post.php" method="POST">
                                        <input type="hidden" name="id" value="1">
                                        <button type="submit">Eliminar</button>
                                    </form>
                                </div>
                                <!-- Imagen opcional -->
                                <div class="post-image">
                                    <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                                </div>
                            </div>
                            <div class="post">
                                <div class="post-content">
                                    <h4>Post de Ejemplo 2</h4>
                                    <p>Contenido del post 2...</p>
                                    <span>Fecha: 2024-11-29</span>
                                </div>
                                <div class="post-buttons">
                                    <form action="edit_post.php" method="GET">
                                        <input type="hidden" name="id" value="2">
                                        <button type="submit">Editar</button>
                                    </form>
                                    <form action="delete_post.php" method="POST">
                                        <input type="hidden" name="id" value="2">
                                        <button type="submit">Eliminar</button>
                                    </form>
                                </div>
                                <!-- Imagen opcional -->
                                <div class="post-image">
                                    <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                `;

                let contenedor = document.getElementById("contenedor");
                if (contenedor) {
                    contenedor.innerHTML = template_bar;
                } else {
                    console.error("Element with ID 'contenedor' not found.");
                }
            }
        });
    });
});
