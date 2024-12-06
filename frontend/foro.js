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
                    console.error('Error al parsear la respuesta:', response);
                    return;
                }

                if (data.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Operación exitosa.',
                        customClass: {
                            popup: 'swal-darkblue-popup',
                            confirmButton: 'swal-darkblue-button'
                        },
                        confirmButtonText: 'Entendido',
                    });
                    actualizarMisPosts();
                    editar = false; // Reiniciar el estado de edición
                    $('#nameP').text('Crear Post');
                    $('#aceptar').text('Publicar');
                    $('#content').val(''); // Limpiar el id_post después de editar
                    $('#title').val('');
                    $('#image-container').hide();
                    $('#image').val('');
                }
            },
            error: function(xhr, status, error) {
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
                        let likeIconClass = post.ha_dado_like ? 'activo' : 'inactivo';
                        postsHtml += `
                                <div class="post">
                                    <input type="hidden" name="id_post" class="id_post" value="${post.id_post}">
                                    <div class="post-content">
                                        <div class="post-all">
                                            <div class="post-image">
                                                <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                            </div>
                                            <div class="post-textanddata">
                                                <div class="post-header">
                                                    <i class='bx bx-user-circle'></i>
                                                    <div class="user-details">
                                                        <h4>${post.nombre}</h4>
                                                        <p>${post.ciudad} , ${post.estado}</p>
                                                    </div>
                                                </div>
                                                <div id="post-text">
                                                    <h4>${post.titulo}</h4>
                                                    <p>${post.contenido}</p>
                                                    <div class="post-meta">
                                                        <span><i class='bx bx-calendar'></i> ${post.fecha_creacion}</span>
                                                        <div class="meta-post-button">
                                                            <span>
                                                                <i id="like-buton" class='bx bx-like like-icon ${likeIconClass}'></i>
                                                            </span>
                                                            <span class="likes-count">${post.likes || 0}</span>
                                                        <input type="checkbox" id="toggle-like-${post.id_post}" style="display: none;">
                                                        <label for="toggle-like-${post.id_post}" class="ver-comentarios bx bx-chat" data-post-id="${post.id_post}"></label>
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
                                        </div>
                                        <div id="comentarios-container-${post.id_post}" class="comentarios-container" style="display: none;">
                                        <div id="comentarios-post-${post.id_post}" class="comments-list">
                                            <!-- Los comentarios se cargarán aquí -->
                                        </div>
                                    </div>
                                    <div class="comment-form">
                                        <textarea id="comentario-input-${post.id_post}" placeholder="Escribe tu comentario..."></textarea>
                                        <button class="submit-comment" data-post-id="${post.id_post}">Comentar</button>
                                    </div>
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
                            Swal.fire({
                                icon: 'question', // Ícono de pregunta para la confirmación
                                title: '¿De verdad deseas eliminar el post?',
                                showCancelButton: true, // Muestra el botón de cancelar
                                confirmButtonText: 'Sí, eliminar', // Texto del botón de confirmación
                                cancelButtonText: 'Cancelar', // Texto del botón de cancelación
                                customClass: {
                                    popup: 'swal-darkblue-popup',
                                    confirmButton: 'swal-darkblue-button',
                                    cancelButton: 'swal-darkblue-button'
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Lógica para eliminar el post si el usuario confirma
                                    console.log('El post ha sido eliminado');
                                    $.ajax({
                                        url: '/SustainCities/backend/deletePost.php',
                                        type: 'POST',
                                        data: { id: id_post },
                                        dataType: 'json',
                                        success: function(response) {
                                            let respuesta = response;
                                            console.log(respuesta);
                                            if (respuesta.status === 'success') {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: '¡Éxito!',
                                                    text: 'Post eliminado exitosamente.',
                                                    customClass: {
                                                        popup: 'swal-darkblue-popup',
                                                        confirmButton: 'swal-darkblue-button'
                                                    },
                                                    confirmButtonText: 'Entendido',
                                                });
                                                actualizarMisPosts(); // Actualizar la lista de posts después de eliminar
                                            }
                                        }
                                    });
                                    // Aquí podrías agregar la llamada a la función de eliminación o redirigir a otra página.
                                } else {
                                    console.log('El post no fue eliminado');
                                }
                            });
                        }
                    }
                } else {
                    // Si algo salió mal, mostrar el mensaje de error
                    $('#mis-posts-container').html('<p>Error al cargar publicaciones.</p>');
                }
            },
        });
    }

    // Mostrar u ocultar comentarios al hacer clic en el botón "Ver comentarios"
    $(document).off('click', '.ver-comentarios').on('click', '.ver-comentarios', function() {
        var postId = $(this).data("post-id");
        var comentariosContainer = $("#comentarios-container-" + postId);
        
        // Alternar la visibilidad del contenedor de comentarios
        comentariosContainer.toggle();
        
        // Si los comentarios aún no han sido cargados, cargarlos ahora
        if (comentariosContainer.is(":visible") && comentariosContainer.find(".comment").length === 0) {
            getComments(postId);
        }
    });
    
    function getComments(postId) {
        $.ajax({
            url: 'http://localhost/SustainCities/backend/getComments.php',
            type: 'GET',
            data: { post_id: postId },
            success: function(response) {
                console.log(response);  // Verifica la respuesta aquí
    
                // Comprobar que la respuesta contiene comentarios
                if (response.status === 'success' && Array.isArray(response.comentarios)) {
                    let comentariosHtml = '';
    
                    // Iterar sobre los comentarios y agregar el HTML correspondiente
                    response.comentarios.forEach(function(comentario) {
                        comentariosHtml += `
                            <div class="comment">
                            <div class="user-details">
                                <h4>${comentario.nombre}</h4>
                                <p>${comentario.ciudad} , ${comentario.estado}</p>
                            </div>
                            <div class="comment-body">${comentario.contenido}</div>
                            </div>
                        `;
                    });
    
                    // Inyectar los comentarios en el contenedor adecuado
                    $("#comentarios-post-" + postId).html(comentariosHtml);
                } else {
                    // Si no hay comentarios, mostrar un mensaje
                    $("#comentarios-post-" + postId).html('<p>No hay comentarios disponibles.</p>');
                }
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: `Error al cargar los comentarios}`,
                    customClass: {
                        popup: 'swal-darkblue-popup',
                        confirmButton: 'swal-darkblue-button'
                    },
                    confirmButtonText: 'Entendido',
                });
            }
        });
    }
    
    
    $(document).off('click', '.submit-comment').on('click', '.submit-comment', function() {
        var postId = $(this).data("post-id");
        var comentario = $("#comentario-input-" + postId).val();
        console.log(postId, comentario);
        if (comentario) {
            $.ajax({
                url: 'http://localhost/SustainCities/backend/addCommentary.php',
                type: 'POST',
                data: {
                    post_id: postId,
                    comentario: comentario
                },
                success: function(response) {
                    console.log(response);
                    if (response.status == 'success') {
                        // Añadir comentario directamente a la lista
                        let comentarioHtml = `
                            <div class="comment">
                                <div class="comment-author">Tú</div>
                                <div class="comment-body">${comentario}</div>
                            </div>
                        `;
                        
                        $("#comentarios-post-" + postId).prepend(comentarioHtml); // Insertar al inicio de los comentarios
                        $("#comentario-input-" + postId).val(""); // Limpiar el campo de comentario
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '¡Error!',
                            text: `Error al agregar el comentario`,
                            customClass: {
                                popup: 'swal-darkblue-popup',
                                confirmButton: 'swal-darkblue-button'
                            },
                            confirmButtonText: 'Entendido',
                        });
                    }
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Alerta!',
                text: `Por favor, escribe un comentario`,
                customClass: {
                    popup: 'swal-darkblue-popup',
                    confirmButton: 'swal-darkblue-button'
                },
                confirmButtonText: 'Entendido',
            });
        }
    })
    

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
                            let likeIconClass = post.ha_dado_like ? 'activo' : 'inactivo'; // Clase diferente dependiendo de si ha dado like
                            postsHtml += `
                                <div class="post">
                                    <input type="hidden" name="id_post" class="id_post" value="${post.id_post}">
                                    <div class="post-content">
                                        <div class="post-all">
                                            <div class="post-image">
                                                <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                            </div>
                                            <div class="post-textanddata">
                                                <div class="post-header">
                                                <i class='bx bx-user-circle'></i>
                                                    <div class="user-details">
                                                        <h4>${post.nombre}</h4>
                                                        <p>${post.ciudad} , ${post.estado}</p>
                                                    </div>
                                                </div>
                                                <div id="post-text">
                                                    <h4>${post.titulo}</h4>
                                                    <p>${post.contenido}</p>
                                                    <div class="post-meta">
                                                        <span><i class='bx bx-calendar'></i> ${post.fecha_creacion}</span>
                                                        <div class="meta-post-button">
                                                            <span>
                                                                <i id="like-buton" class='bx bx-like like-icon ${likeIconClass}'></i>
                                                            </span>
                                                            <span class="likes-count">${post.likes || 0}</span>
                                                            <input type="checkbox" id="toggle-like-${post.id_post}" style="display: none;">
                                                            <label for="toggle-like-${post.id_post}" class="ver-comentarios bx bx-chat" data-post-id="${post.id_post}"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="comentarios-container-${post.id_post}" class="comentarios-container" style="display: none;">
                                            <div id="comentarios-post-${post.id_post}" class="comments-list">
                                                <!-- Los comentarios se cargarán aquí -->
                                            </div>
                                        </div>
                                        <div class="comment-form">
                                            <textarea id="comentario-input-${post.id_post}" placeholder="Escribe tu comentario..."></textarea>
                                            <button class="submit-comment" data-post-id="${post.id_post}">Comentar</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        // Insertar los posts generados en el contenedor
                        $('#results-container').html(postsHtml);
                    }
                } else {
                    // Si algo salió mal, mostrar el mensaje de error
                    $('#results-container').html('<p>Error al cargar publicaciones.</p>');
                }
            },
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
                            let likeIconClass = post.ha_dado_like ? 'activo' : 'inactivo'; // Clase diferente dependiendo de si ha dado like
                            resultsHtml += `
                                    <div class="post">
                                        <input type="hidden" name="id_post" class="id_post" value="${post.id_post}">
                                        <div class="post-content">
                                            <div class="post-all">
                                                <div class="post-image">
                                                    <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                                </div>
                                                <div class="post-textanddata">
                                                    <div class="post-header">
                                                    <i class='bx bx-user-circle'></i>
                                                        <div class="user-details">
                                                            <h4>${post.nombre}</h4>
                                                            <p>${post.ciudad} , ${post.estado}</p>
                                                        </div>
                                                    </div>
                                                    <div id="post-text">
                                                        <h4>${post.titulo}</h4>
                                                        <p>${post.contenido}</p>
                                                        <div class="post-meta">
                                                            <span><i class='bx bx-calendar'></i> ${post.fecha_creacion}</span>
                                                            <div class="meta-post-button">
                                                                <span>
                                                                    <i id="like-buton" class='bx bx-like like-icon ${likeIconClass}'></i>
                                                                </span>
                                                                <span class="likes-count">${post.likes || 0}</span>
                                                                <input type="checkbox" id="toggle-like-${post.id_post}" style="display: none;">
                                                                <label for="toggle-like-${post.id_post}" class="ver-comentarios bx bx-chat" data-post-id="${post.id_post}"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="comentarios-container-${post.id_post}" class="comentarios-container" style="display: none;">
                                                <div id="comentarios-post-${post.id_post}" class="comments-list">
                                                    <!-- Los comentarios se cargarán aquí -->
                                                </div>
                                            </div>
                                            <div class="comment-form">
                                                <textarea id="comentario-input-${post.id_post}" placeholder="Escribe tu comentario..."></textarea>
                                                <button class="submit-comment" data-post-id="${post.id_post}">Comentar</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            });

                            // Insertar los resultados generados en el contenedor
                            $('#results-container').html(resultsHtml);
                        }
                    } else {
                        $('#results-container').html('<p>No se encontraron resultados.</p>');
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
                                let likeIconClass = post.ha_dado_like ? 'activo' : 'inactivo';
                                postsHtml += `
                                    <div class="post">
                                        <input type="hidden" name="id_post" class="id_post" value="${post.id_post}">
                                        <div class="post-content">
                                            <div class="post-all">
                                                <div class="post-image">
                                                    <img src="${post.imagen ? 'data:image/jpeg;base64,' + post.imagen : ''}">
                                                </div>
                                                <div class="post-textanddata">
                                                    <div class="post-header">
                                                        <i class='bx bx-user-circle'></i>
                                                        <div class="user-details">
                                                            <h4>${post.nombre}</h4>
                                                            <p>${post.ciudad} , ${post.estado}</p>
                                                        </div>
                                                    </div>
                                                    <div id="post-text">
                                                        <h4>${post.titulo}</h4>
                                                        <p>${post.contenido}</p>
                                                        <div class="post-meta">
                                                            <span><i class='bx bx-calendar'></i> ${post.fecha_creacion}</span>
                                                            <div class="meta-post-button">
                                                                <span>
                                                                    <i id="like-buton" class='bx bx-like like-icon ${likeIconClass}'></i>
                                                                </span>
                                                                <span class="likes-count">${post.likes || 0}</span>
                                                            <input type="checkbox" id="toggle-like-${post.id_post}" style="display: none;">
                                                            <label for="toggle-like-${post.id_post}" class="ver-comentarios bx bx-chat" data-post-id="${post.id_post}"></label>
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
                                            </div>
                                            <div id="comentarios-container-${post.id_post}" class="comentarios-container" style="display: none;">
                                            <div id="comentarios-post-${post.id_post}" class="comments-list">
                                                <!-- Los comentarios se cargarán aquí -->
                                            </div>
                                        </div>
                                        <div class="comment-form">
                                            <textarea id="comentario-input-${post.id_post}" placeholder="Escribe tu comentario..."></textarea>
                                            <button class="submit-comment" data-post-id="${post.id_post}">Comentar</button>
                                        </div>
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
                                Swal.fire({
                                    icon: 'question', // Ícono de pregunta para la confirmación
                                    title: '¿De verdad deseas eliminar el post?',
                                    showCancelButton: true, // Muestra el botón de cancelar
                                    confirmButtonText: 'Sí, eliminar', // Texto del botón de confirmación
                                    cancelButtonText: 'Cancelar', // Texto del botón de cancelación
                                    customClass: {
                                        popup: 'swal-darkblue-popup',
                                        confirmButton: 'swal-darkblue-button',
                                        cancelButton: 'swal-darkblue-button'
                                    }
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // Lógica para eliminar el post si el usuario confirma
                                        console.log('El post ha sido eliminado');
                                        $.ajax({
                                            url: '/SustainCities/backend/deletePost.php',
                                            type: 'POST',
                                            data: { id: id_post },
                                            dataType: 'json',
                                            success: function(response) {
                                                let respuesta = response;
                                                console.log(respuesta);
                                                if (respuesta.status === 'success') {
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: '¡Éxito!',
                                                        text: 'Post eliminado exitosamente.',
                                                        customClass: {
                                                            popup: 'swal-darkblue-popup',
                                                            confirmButton: 'swal-darkblue-button'
                                                        },
                                                        confirmButtonText: 'Entendido',
                                                    });
                                                    actualizarMisPosts(); // Actualizar la lista de posts después de eliminar
                                                }
                                            }
                                        });
                                        // Aquí podrías agregar la llamada a la función de eliminación o redirigir a otra página.
                                    } else {
                                        console.log('El post no fue eliminado');
                                    }
                                });
                                }
                            }
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

    $(document).on('click', '#like-buton', function() {
        const id_post = $(this).closest('.post').find('.id_post').val();
        console.log('Entrando al clic. ID del post:', id_post);
    
        // Realiza la solicitud al servidor para registrar el "like"
        $.ajax({
            url: '../backend/like.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id_post: id_post }),
            dataType: 'json',
            success: (data) => {
                if (data.status === 'success') {
                    // Verifica si la acción fue "like" o "unlike"
                    const action = data.message; // Asumiendo que el servidor devuelve esta propiedad
    
                    const postElement = $(this).closest('.post');
                    const likesCount = postElement.find('.likes-count');
    
                    if (likesCount.length) {
                        let currentLikes = parseInt(likesCount.text()) || 0;
    
                        if (action === 'Like added') {
                            // Incrementa el contador de likes y agrega la clase "active" al botón
                            likesCount.text(currentLikes + 1);
                            $(this).removeClass('inactivo');
                            $(this).addClass('activo');
                        } else if (action === 'Like removed') {
                            // Decrementa el contador de likes y elimina la clase "active" del botón
                            likesCount.text(currentLikes - 1);
                            $(this).removeClass('activo');
                            $(this).addClass('inactivo');
                        }
                    }
                }
            },
        });
    });

});
