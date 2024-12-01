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
                                <form id="createPostForm" enctype="multipart/form-data">
                                    <input type="text" name="title" placeholder="Título del post" required>
                                    <textarea name="content" rows="5" placeholder="Escribe tu post aquí..." required></textarea>
                                    <!-- Sección para subir imágenes (0, 1 o muchas) -->
                                    <label for="images">Sube imágenes (opcional):</label>
                                    <input type="file" name="image" id="image" accept="image/*">
                                    <button type="submit">Publicar</button>
                                </form>
                            </div>
                            <!-- Contenedor de posts -->
                            <div id="mis-posts-container" class="posts-section">
                                <!-- Aquí se insertarán los posts dinámicamente -->
                            </div>
                        </div>
                        </div>
                    `;

                    let contenedor = document.getElementById("contenedor");
                    if (contenedor) {
                        contenedor.innerHTML = template_bar;
                        actualizarMisPosts();
                    } else {
                        console.error("Element with ID 'contenedor' not found.");
                    }
                }
            });
        });
        $(document).on('submit', '#createPostForm', function(e) {
            e.preventDefault(); // Evitar que el formulario recargue la página
            enviarPost(this); // Llamar a la función para enviar el post
        });


        // Función para enviar el post
        function enviarPost(form) {
            let formData = new FormData(form); // Crear un FormData con los datos del formulario
        
            // Mostrar el contenido del formData (opcional)
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        
            $.ajax({
                url: 'http://localhost/SustainCities/backend/newPost.php', // Archivo PHP que manejará la creación del post
                type: 'POST',
                data: formData,
                processData: false, // No procesar los datos
                contentType: false, // No establecer el tipo de contenido
                success: function(response) {
                    // Verificar si el servidor respondió con un JSON
                    let data = response;
                    console.log(response);
                    if (data.status == 'success') {
                        alert('Post creado exitosamente');
                        actualizarMisPosts(); // Actualizar la sección de Mis Posts después de crear el post
                    } else {
                        alert('Error al crear el post linea 114: ' + data.message);
                    }
                },
            });
        }
        
        // Función para actualizar la sección de Mis Posts
        function actualizarMisPosts() {
            $.ajax({
                url: 'http://localhost/SustainCities/backend/myPosts.php', // Archivo PHP que obtiene los posts del usuario
                type: 'GET',
                success: function(response) {
                    let data = response; 
                    console.log(data);
        
                    if (data.status == 'success') {
                        if (data.posts == 'No tienes publicaciones.') {
                            $('#mis-posts-container').html('<p>No tienes publicaciones.</p>');
                        } else {
                            // Aquí generas los posts, si existen
                            let postsHtml = '';
                            data.posts.forEach(function(post) {
                                postsHtml += `
                                    <div class="post">
                                        <div class="post-content">
                                            <h4>${post.titulo}</h4>
                                            <p>${post.contenido}</p>
                                            <span>Fecha: ${post.fecha_creacion}</span>
                                        </div>
                                        <div class="post-image">
                                            <!-- Asegurándote de que la imagen se muestra correctamente -->
                                            <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : 'https://via.placeholder.com/150'}" alt="Imagen del post">
                                        </div>
                                    </div>
                                `;
                            });
                            // Insertar los posts generados en el contenedor
                            $('#mis-posts-container').html(postsHtml); 
                        }
                    } else {
                        // Si algo salió mal, mostrar el mensaje de error
                        $('#mis-posts-container').html('<p>Error al cargar publicaciones.</p>');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Error al actualizar la sección de Mis Posts');
                }
            });
        }        
});
