$(document).ready(function () {
    seccionInicio();

    function seccionInicio() {
        let template_bar = `
            <div class="posts-section">
                <div class="post">
                    <div class="post-image">
                        <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                    </div>
                    <div class="post-content">
                        <div class="post-header">
                            <i class='bx bx-user-circle' ></i>
                            <div class="user-details">
                                <h4>Usuario1</h4>
                                <h5>Estado, Ciudad</h5>
                            </div>
                        </div>
                        <div class="post-text">
                            <h3>Categoría de la Publicación</h3>
                            <p>Contenido breve de la publicación...</p>
                            <div class="post-meta">
                                <span><i class='bx bx-calendar' ></i> 2024-11-30</span>
                                <div class="meta-post-button">
                                    <span>15 <i class='bx bx-like' ></i></span>
                                    <span>15 <i class='bx bx-chat'></i></span>
                                </div>
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
                                <div class="post-image">
                                    <img src="https://via.placeholder.com/150" alt="Imagen de la publicación">
                                </div>
                                <div class="post-content">
                                    <h4>Post de Ejemplo 1</h4>
                                    <p>Contenido del post 1...</p>
                                    <span><i class='bx bx-calendar' ></i> 2024-11-30</span>
                                </div>
                                <div class="post-buttons">
                                    <form action="edit_post.php" method="GET">
                                        <input type="hidden" name="id" value="1">
                                        <button type="submit"><i class='bx bx-edit'></i></button>
                                    </form>
                                    <form action="delete_post.php" method="POST">
                                        <input type="hidden" name="id" value="1">
                                        <button type="submit"><i class='bx bx-trash'></i></button>
                                    </form>
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
