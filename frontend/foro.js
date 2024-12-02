$(document).ready(function () {
    var editar = false;
    seccionInicio();
    function seccionInicio() {
        let template_bar = `
            <div class="search-bar">
                <input type="text" placeholder="Buscar en el foro..." id="search-start">
                <button id="search-button"><i class='bx bx-search'></i></button>
            </div>

            <div id="results-container" class="posts-section">
                <!-- Aquí se insertarán los posts dinámicamente -->
            </div>
        `;

        let contenedor = document.getElementById("contenedor");
        if (contenedor) {
            contenedor.innerHTML = template_bar;
            postInicio();
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
                <div class="search-bar">
                    <input type="text" placeholder="Buscar en el foro..." id="search-mypost">
                    <button id="search-button"><i class='bx bx-search'></i></button>
                </div>
                    <div class="content-container">
                        <div class="form-section">
                            <h3 id="nameP">Crear Post</h3>
                            <form id="createPostForm" enctype="multipart/form-data">
                                <input type="hidden" id="post_id" name="post_id" value="">
                                <input type="text" name="title" id="title" placeholder="Título del post" required>
                                <textarea name="content" id="content" rows="5" placeholder="Escribe tu post aquí..." required></textarea>
                                <div id="image-container" style="display: none;">
                                    <label for="current-image">Imagen Actual:</label>
                                    <img id="current-image" src="https://via.placeholder.com/150" alt="Imagen actual" style="max-width: 150px; max-height: 150px;">
                                    <br>
                                </div>
                                <label for="images">Sube imágenes (opcional):</label>
                                <input type="file" name="image" id="image" accept="image/*">
                                <button type="submit" id="aceptar">Publicar</button>
                            </form>
                        </div>
                        <!-- Contenedor de posts -->
                        <div>
                        <h3>Mis Posts</h3>
                        <div id="mis-posts-container" class="posts-section">
                            <!-- Aquí se insertarán los posts dinámicamente -->
                        </div>
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
        let formData = new FormData(form);

        let url = editar === false
            ? '/SustainCities/backend/newPost.php'
            : '/SustainCities/backend/editPost.php';

        $.ajax({
            url: url, // Archivo PHP que manejará la creación o edición del post
            type: 'POST',
            data: formData,
            processData: false, // No procesar los datos
            contentType: false, // No establecer el tipo de contenido
            success: function(response) {
                let data;
                try {
                    data = response; // Convertir la respuesta a JSON
                } catch (e) {
                    alert('Respuesta inesperada del servidor. Por favor, intenta nuevamente.');
                    console.error('Error al parsear la respuesta:', response);
                    return;
                }

                if (data.status === 'success') {
                    alert('Operación exitosa');
                    actualizarMisPosts();
                    editar = false; // Reiniciar el estado de edición
                    $('#nameP').text('Crear Post');
                    $('#aceptar').text('Publicar');
                    $('#content').val(''); // Limpiar el id_post después de editar
                    $('#title').val('');
                    $('#image-container').hide();
                    $('#image').val('');
                } else {
                    if (editar) {
                        alert('Error al editar el post línea 114: ' + data.message);
                    } else {
                        alert('Error al crear el post línea 114: ' + data.message);
                    }
                }
            },
            error: function(xhr, status, error) {
                alert('Error en la comunicación con el servidor: ' + error);
                console.error('Detalles del error:', xhr, status, error);
            }
        });
    }

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
                                    <div class="post-image">
                                        <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                    </div>
                                    <div class="post-content">
                                        <h4>${post.titulo}</h4>
                                        <p>${post.contenido}</p>
                                        <div class="post-meta">
                                            <span><i class='bx bx-calendar' ></i> ${post.fecha_creacion}</span>
                                            <div class="meta-post-button">
                                                <span><i id="likes" class='bx bx-like' ></i></span>
                                                <span><i id="comentarios" class='bx bx-chat'></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-buttons">
                                        <form action="edit_post.php" method="GET">
                                            <input type="hidden" name="id" value="${post.id_post}">
                                            <button type="submit" id="editarPost-${post.id_post}"><i class='bx bx-edit'></i></button>
                                        </form>
                                        <form action="delete_post.php" method="POST" id="delete-post-form-${post.id_post}">
                                            <input type="hidden" name="id" value="${post.id_post}">
                                            <button type="submit" id="eliminarPost-${post.id_post}"><i class='bx bx-trash'></i></button>
                                        </form>
                                    </div>
                                </div>
                            `;
                        });
                        // Insertar los posts generados en el contenedor
                        $('#mis-posts-container').html(postsHtml);

                        // Asegurarse de no duplicar eventos para "Editar"
                        $(document).off('click', '[id^="editarPost-"]').on('click', '[id^="editarPost-"]', function(e) {
                            e.preventDefault(); // Evitar que el formulario recargue la página
                            const id_post = $(this).closest('form').find('input[name="id"]').val();
                            cargarPostParaEdicion(id_post);
                        });

                        // Asegurarse de no duplicar eventos para "Eliminar"
                        $(document).off('click', '[id^="eliminarPost-"]').on('click', '[id^="eliminarPost-"]', function(e) {
                            e.preventDefault();
                            const id_post = $(this).closest('form').find('input[name="id"]').val();
                            eliminarPost(id_post);
                        });

                        function cargarPostParaEdicion(id_post) {
                            $.get('/SustainCities/backend/getPost.php', { id: id_post }, function(response) {
                                const post = response.posts[0];
                                console.log(post);
                        
                                // Rellenar el formulario con los datos del post
                                $('#title').val(post.titulo);
                                $('#content').val(post.contenido);
                                $('#post_id').val(post.id_post);
                                console.log(post.id_post);
                        
                                // Mostrar la imagen actual si existe
                                if (post.imagen) {
                                    $('#current-image').attr('src', 'data:image/jpeg;base64,' + post.imagen);
                                    $('#image-container').show(); // Mostrar el contenedor de imagen actual y campo de subida
                                } else {
                                }
                        
                                // Asegurarse de que el campo de imagen esté listo para aceptar una nueva imagen
                                $('#image').val(''); // Limpiar el campo de entrada de imagen para la edición
                        
                                $('#nameP').text('Editar Post');
                                $('#aceptar').text('Guardar Cambios');
                                editar = true;
                            });
                        }

                        // Función para eliminar el post
                        function eliminarPost(id_post) {
                            if (confirm("¿De verdad deseas eliminar el post?")) {
                                // Enviar solicitud AJAX para eliminar el post
                                $.ajax({
                                    url: '/SustainCities/backend/deletePost.php',
                                    type: 'POST',
                                    data: { id: id_post },
                                    dataType: 'json',
                                    success: function(response) {
                                        let respuesta = response;
                                        console.log(respuesta);
                                        if (respuesta.status === 'success') {
                                            actualizarMisPosts(); // Actualizar la lista de posts después de eliminar
                                        } else {
                                            alert('Error al eliminar el post.');
                                        }
                                    }
                                });
                            }
                        }
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

    function postInicio() {
        $.ajax({
            url: 'http://localhost/SustainCities/backend/postInicio.php', // Archivo PHP que obtiene los posts del usuario
            type: 'GET',
            success: function(response) {
                let data = response;
                console.log(data);

                if (data.status == 'success') {
                    if (data.posts == 'No tienes publicaciones.') {
                        $('#results-container').html('<p>No tienes publicaciones.</p>');
                    } else {
                        // Aquí generas los posts, si existen
                        let postsHtml = '';
                        data.posts.forEach(function(post) {
                            postsHtml += `
                                <div class="post">
                                    <div class="post-image">
                                        <!-- Asegurándote de que la imagen se muestra correctamente -->
                                        <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                    </div>
                                    <div class="post-content">
                                        <div class="post-header">
                                            <i class='bx bx-user-circle' ></i>
                                            <div class="user-details"
                                                <h4>${post.nombre}</h4>
                                                <p>${post.ciudad} , ${post.estado}</p>
                                            </div>
                                        </div>
                                        <div id="post-text">
                                            <h4>${post.titulo}</h4>
                                            <p>${post.contenido}</p>
                                            <div class="post-meta">
                                                <span><i class='bx bx-calendar' ></i> ${post.fecha_creacion}</span>
                                                <div class="meta-post-button">
                                                    <span><i id="likes" class='bx bx-like' ></i></span>
                                                    <span><i id="comentarios" class='bx bx-chat'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        // Insertar los posts generados en el contenedor
                        $('#results-container').html(postsHtml);

                        // Asegurarse de no duplicar eventos para "Editar"
                        $(document).off('click', '[id^="editarPost-"]').on('click', '[id^="editarPost-"]', function(e) {
                            e.preventDefault(); // Evitar que el formulario recargue la página
                            const id_post = $(this).closest('form').find('input[name="id"]').val();
                            cargarPostParaEdicion(id_post);
                        });

                        // Asegurarse de no duplicar eventos para "Eliminar"
                        $(document).off('click', '[id^="eliminarPost-"]').on('click', '[id^="eliminarPost-"]', function(e) {
                            e.preventDefault();
                            const id_post = $(this).closest('form').find('input[name="id"]').val();
                            eliminarPost(id_post);
                        });

                        function cargarPostParaEdicion(id_post) {
                            $.get('/SustainCities/backend/getPost.php', { id: id_post }, function(response) {
                                const post = response.posts[0];
                                console.log(post);

                                // Rellenar el formulario con los datos del post
                                $('#title').val(post.titulo);
                                $('#content').val(post.contenido);
                                $('#post_id').val(post.id_post);
                                console.log(post.id_post);
                                // Mostrar la imagen actual (si existe)
                                if (post.imagen) {
                                    // Mostrar la imagen actual si está disponible
                                    $('#current-image').attr('src', 'data:image/jpeg;base64,' + post.imagen);
                                } else {

                                }

                                // Limpiar el campo para la imagen
                                $('#image').val(''); // Asegurarse de que el input de archivo esté vacío

                                // Mostrar el contenedor para editar la imagen
                                $('#image-container').show(); // Mostrar el contenedor de imagen actual y campo de subida

                                $('#nameP').text('Editar Post');
                                $('#aceptar').text('Guardar Cambios');
                                editar=true;
                            });
                        }

                        // Función para eliminar el post
                        function eliminarPost(id_post) {
                            if (confirm("¿De verdad deseas eliminar el post?")) {
                                // Enviar solicitud AJAX para eliminar el post
                                $.ajax({
                                    url: '/SustainCities/backend/deletePost.php',
                                    type: 'POST',
                                    data: { id: id_post },
                                    dataType: 'json',
                                    success: function(response) {
                                        let respuesta = response;
                                        console.log(respuesta);
                                        if (respuesta.status === 'success') {
                                            actualizarMisPosts(); // Actualizar la lista de posts después de eliminar
                                        } else {
                                            alert('Error al eliminar el post.');
                                        }
                                    }
                                });
                            }
                        }
                    }
                } else {
                    // Si algo salió mal, mostrar el mensaje de error
                    $('#results-container').html('<p>Error al cargar publicaciones.</p>');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error al actualizar la sección de Mis Posts');
            }
        });
    }

    $(document).on('keyup', '#search-start', function () {
        const query = $(this).val(); // Captura el valor del input
        const searchId = $(this).attr('id'); // Obtiene el ID del campo activo

        console.log('Search Value:', query);
        console.log('Search ID:', searchId);

        // Solo realiza la búsqueda si el query tiene algún valor
        if (query) {
            // Define la URL del backend
            const url = '/SustainCities/backend/searchAll.php';

            $.ajax({
                url: url,
                type: 'GET',
                data: { query: query },
                contentType: false,
                success: function (response) {
                    const data = response;
                    if (data.status === 'success') {
                        if (data.posts === 'No se encontraron resultados.') {
                            $('#results-container').html('<p>No se encontraron resultados.</p>');
                        } else {
                            let resultsHtml = '';
                            data.posts.forEach(function(post) {
                                resultsHtml += `
                                    <div class="post">
                                    <div class="post-image">
                                        <!-- Asegurándote de que la imagen se muestra correctamente -->
                                        <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                    </div>
                                    <div class="post-content">
                                        <div class="post-header">
                                            <i class='bx bx-user-circle' ></i>
                                            <div class="user-details"
                                                <h4>${post.nombre}</h4>
                                                <p>${post.ciudad} , ${post.estado}</p>
                                            </div>
                                        </div>
                                        <div id="post-text">
                                            <h4>${post.titulo}</h4>
                                            <p>${post.contenido}</p>
                                            <div class="post-meta">
                                                <span><i class='bx bx-calendar' ></i> ${post.fecha_creacion}</span>
                                                <div class="meta-post-button">
                                                    <span><i id="likes" class='bx bx-like' ></i></span>
                                                    <span><i id="comentarios" class='bx bx-chat'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                            });

                            // Insertar los resultados generados en el contenedor
                            $('#results-container').html(resultsHtml);

                            $(document).on('click', '[id^="editarPost-"]', function(e) {
                                e.preventDefault(); // Evitar que el formulario recargue la página
                                const id_post = $(this).closest('form').find('input[name="id"]').val();
                                cargarPostParaEdicion(id_post);
                            });

                            $(document).on('click', '[id^="eliminarPost-"]', function(e) {
                                e.preventDefault();
                                const id_post = $(this).closest('form').find('input[name="id"]').val();
                                eliminarPost(id_post);
                            });

                            function cargarPostParaEdicion(id_post) {
                                $.get('/SustainCities/backend/getPost.php', { id: id_post }, function(response) {
                                    const post = response.posts[0];
                                    console.log(post);

                                    // Rellenar el formulario con los datos del post
                                    $('#title').val(post.titulo);
                                    $('#content').val(post.contenido);
                                    $('#post_id').val(post.id_post);
                                    console.log(post.id_post);
                                    // Mostrar la imagen actual (si existe)
                                    if (post.imagen) {
                                        $('#current-image').attr('src', 'data:image/jpeg;base64,' + post.imagen);
                                    } else {

                                    }

                                    $('#image').val(''); // Limpiar el campo de la imagen
                                    $('#image-container').show(); // Mostrar contenedor de imagen y campo de subida

                                    $('#nameP').text('Editar Post');
                                    $('#aceptar').text('Guardar Cambios');
                                    editar = true;
                                });
                            }

                            // Función para eliminar el post
                            function eliminarPost(id_post) {
                                if (confirm("¿De verdad deseas eliminar el post?")) {
                                    $.ajax({
                                        url: '/SustainCities/backend/deletePost.php',
                                        type: 'POST',
                                        data: { id: id_post },
                                        dataType: 'json',
                                        success: function(response) {
                                            let respuesta = response;
                                            console.log(respuesta);
                                            if (respuesta.status === 'success') {
                                                actualizarResultados(); // Actualizar lista después de eliminar
                                            } else {
                                                alert('Error al eliminar el post.');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    } else {
                        $('#results-container').html('<p>Error al cargar los resultados.</p>');
                    }
                },
                error: function () {
                    $('#results-container').html('<p>Error en la búsqueda</p>');
                }
            });
        } else {
            seccionInicio();
        }
    });

    $(document).on('keyup', '#search-mypost', function () {
        const query = $(this).val(); // Captura el valor del input
        const searchId = $(this).attr('id'); // Obtiene el ID del campo activo

        console.log('Search Value:', query);
        console.log('Search ID:', searchId);

        // Solo realiza la búsqueda si el id es 'search-mypost'
        if (query) {
            // Define la URL del backend
            url = '/SustainCities/backend/mySearch.php';

            $.ajax({
                url: url,
                type: 'GET',
                data: { query: query },
                contentType: false,
                success: function (response) {
                    const data = response;
                    console.log(response);
                    if (data.status == 'success') {
                        if (data.posts == 'No tienes publicaciones.') {
                            $('#mis-posts-container').html('<p>No tienes publicaciones.</p>');
                        } else {
                            let postsHtml = '';
                            data.posts.forEach(function(post) {
                                postsHtml += `
                                    <div class="post">
                                    <div class="post-image">
                                        <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                    </div>
                                    <div class="post-content">
                                        <h4>${post.titulo}</h4>
                                        <p>${post.contenido}</p>
                                        <div class="post-meta">
                                            <span><i class='bx bx-calendar' ></i> ${post.fecha_creacion}</span>
                                            <div class="meta-post-button">
                                                <span><i id="likes" class='bx bx-like' ></i></span>
                                                <span><i id="comentarios" class='bx bx-chat'></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-buttons">
                                        <form action="edit_post.php" method="GET">
                                            <input type="hidden" name="id" value="${post.id_post}">
                                            <button type="submit" id="editarPost-${post.id_post}"><i class='bx bx-edit'></i></button>
                                        </form>
                                        <form action="delete_post.php" method="POST" id="delete-post-form-${post.id_post}">
                                            <input type="hidden" name="id" value="${post.id_post}">
                                            <button type="submit" id="eliminarPost-${post.id_post}"><i class='bx bx-trash'></i></button>
                                        </form>
                                    </div>
                                </div>
                                `;
                            });
                            // Insertar los posts generados en el contenedor
                            $('#mis-posts-container').html(postsHtml);

                            $(document).on('click', '[id^="editarPost-"]', function(e) {
                                e.preventDefault(); // Evitar que el formulario recargue la página
                                const id_post = $(this).closest('form').find('input[name="id"]').val();
                                cargarPostParaEdicion(id_post);
                            });

                            $(document).on('click', '[id^="eliminarPost-"]', function(e) {
                                e.preventDefault();
                                const id_post = $(this).closest('form').find('input[name="id"]').val();
                                eliminarPost(id_post);
                            });

                            function cargarPostParaEdicion(id_post) {
                                $.get('/SustainCities/backend/getPost.php', { id: id_post }, function(response) {
                                    const post = response.posts[0];
                                    console.log(post);

                                    // Rellenar el formulario con los datos del post
                                    $('#title').val(post.titulo);
                                    $('#content').val(post.contenido);
                                    $('#post_id').val(post.id_post);
                                    console.log(post.id_post);
                                    // Mostrar la imagen actual (si existe)
                                    if (post.imagen) {
                                        $('#current-image').attr('src', 'data:image/jpeg;base64,' + post.imagen);
                                    } else {
                                         
                                    }

                                    $('#image').val(''); // Limpiar el campo de la imagen
                                    $('#image-container').show(); // Mostrar contenedor de imagen y campo de subida

                                    $('#nameP').text('Editar Post');
                                    $('#aceptar').text('Guardar Cambios');
                                    editar = true;
                                });
                            }

                            // Función para eliminar el post
                            function eliminarPost(id_post) {
                                if (confirm("¿De verdad deseas eliminar el post?")) {
                                    $.ajax({
                                        url: '/SustainCities/backend/deletePost.php',
                                        type: 'POST',
                                        data: { id: id_post },
                                        dataType: 'json',
                                        success: function(response) {
                                            let respuesta = response;
                                            console.log(respuesta);
                                            if (respuesta.status === 'success') {
                                                actualizarMisPosts(); // Actualizar lista después de eliminar
                                            } else {
                                                alert('Error al eliminar el post.');
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    } else {
                        $('#mis-posts-container').html('<p>Error al cargar publicaciones.</p>');
                    }
                },
                error: function () {
                    $('#mis-posts-container').html('<p>Error en la búsqueda</p>');
                }

            });
        } else {
            actualizarMisPosts();
        }
    });

});
