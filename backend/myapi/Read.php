<?php

namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;
include_once __DIR__.'/DataBase.php';
class Read extends DataBase {

    public function __construct($db) {
        $this->data = array();
        parent::__construct($db);
    }

    public function getEstados() {
        $query = 'SELECT id_estado, nombre_estado FROM estado ';
        $stmt = $this->conexion->prepare($query);

        if (!$stmt) {
            throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        $estados = [];

        while ($row = $result->fetch_assoc()) {
            $estados[] = $row;
        }

        $stmt->close(); // Liberar recursos
        $this->data = $estados;
    }

    public function getCiudades($id_estado) {
        $query = "SELECT id_ciudad, nombre FROM ciudades WHERE id_estado = ?";
        $stmt = $this->conexion->prepare($query);

        if (!$stmt) {
            throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
        }

        $stmt->bind_param('i', $id_estado); // Vincula el parámetro como un entero
        $stmt->execute();
        $result = $stmt->get_result();
        $ciudades = [];

        while ($row = $result->fetch_assoc()) {
            $ciudades[] = $row;
        }

        $stmt->close(); // Liberar recursos
        $this->data = $ciudades;
    }

    public function postInicio() {
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');

            $id_usuario = $_SESSION['id_usuario'];
        
            // Consulta SQL para obtener los posts de la vista
            $query = "SELECT * FROM vista_posts_usuario WHERE eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Ejecutar la consulta y obtener los resultados
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si hay posts
            if ($result->num_rows > 0) {
                $posts = [];
    
                // Iterar sobre los resultados de los posts
                while ($row = $result->fetch_assoc()) {
                    // Verificar si hay una imagen y convertirla a base64 si existe
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        // Convertir el BLOB a base64
                        $imagen = base64_encode($row['imagen']);
                    }
    
                    // Consulta para verificar si el usuario ha dado 'like' a este post
                    $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                    $stmtLike = $this->conexion->prepare($queryLike);
                    if (!$stmtLike) {
                        throw new \Exception("Error al preparar la consulta de likes: " . $this->conexion->error);
                    }
    
                    // Vincular los parámetros de usuario e id_post
                    $stmtLike->bind_param("ii", $id_usuario, $row['id_post']);
                    $stmtLike->execute();
                    $stmtLike->store_result();
    
                    // Determinar si el usuario ha dado 'like' al post
                    $haDadoLike = $stmtLike->num_rows > 0;
    
                    // Cerrar el stmt de la consulta de likes
                    $stmtLike->close();
    
                    // Agregar el post al array de resultados
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen, // La imagen en base64 o null si no existe
                        'id_usuario' => $row['id_usuario'],
                        'nombre' => $row['nombre'],
                        'ciudad' => $row['ciudad'],
                        'estado' => $row['estado'],
                        'ha_dado_like' => $haDadoLike, // Se asigna el valor true o false
                    ];
                }
    
                $stmt->close(); // Liberar recursos
                // Retornar la respuesta en formato JSON
                echo json_encode(['status' => 'success', 'posts' => $posts]);
    
            } else {
                // Si no hay posts, retornar un mensaje en formato JSON
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            // Capturar cualquier error en la ejecución y devolverlo en formato JSON
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    

    public function getPosts($id_usuario) {
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');
    
            // Consulta SQL para obtener los posts de la vista
            $query = "SELECT * FROM vista_posts_usuario WHERE eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Ejecutar la consulta y obtener los resultados
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si hay posts
            if ($result->num_rows > 0) {
                $posts = [];
    
                // Iterar sobre los resultados de los posts
                while ($row = $result->fetch_assoc()) {
                    // Verificar si hay una imagen y convertirla a base64 si existe
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        // Convertir el BLOB a base64
                        $imagen = base64_encode($row['imagen']);
                    }
    
                    // Consulta para verificar si el usuario ha dado 'like' a este post
                    $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                    $stmtLike = $this->conexion->prepare($queryLike);
                    if (!$stmtLike) {
                        throw new \Exception("Error al preparar la consulta de likes: " . $this->conexion->error);
                    }
    
                    // Vincular los parámetros de usuario e id_post
                    $stmtLike->bind_param("ii", $id_usuario, $row['id_post']);
                    $stmtLike->execute();
                    $stmtLike->store_result();
    
                    // Determinar si el usuario ha dado 'like' al post
                    $haDadoLike = $stmtLike->num_rows > 0;
    
                    // Cerrar el stmt de la consulta de likes
                    $stmtLike->close();
    
                    // Agregar el post al array de resultados
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen, // La imagen en base64 o null si no existe
                        'id_usuario' => $row['id_usuario'],
                        'nombre' => $row['nombre'],
                        'ciudad' => $row['ciudad'],
                        'estado' => $row['estado'],
                        'ha_dado_like' => $haDadoLike, // Se asigna el valor true o false
                    ];
                }
    
                $stmt->close(); // Liberar recursos
                // Retornar la respuesta en formato JSON
                echo json_encode(['status' => 'success', 'posts' => $posts]);
    
            } else {
                // Si no hay posts, retornar un mensaje en formato JSON
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            // Capturar cualquier error en la ejecución y devolverlo en formato JSON
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    public function getPost($id_post) {
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');
    
            // Consulta SQL para obtener los posts de la vista
            $query = "SELECT * FROM vista_posts_usuario WHERE id_post = ?";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Vincula el parámetro como un entero (id_usuario)
            $stmt->bind_param('i', $id_post);
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si hay posts
            if ($result->num_rows > 0) {
                $posts = [];
    
                // Generar el array de posts
                while ($row = $result->fetch_assoc()) {
                    // Verificar si hay una imagen y convertirla a base64 si existe
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        // Convertir el BLOB a base64
                        $imagen = base64_encode($row['imagen']);
                    }
    
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen, // La imagen en base64 o null si no existe
                        'id_usuario' => $row['id_usuario']
                    ];
                }
    
                $stmt->close(); // Liberar recursos
                // Retornar la respuesta en formato JSON
                echo json_encode(['status' => 'success', 'posts' => $posts]);
    
            } else {
                // Si no hay posts, retornar un mensaje en formato JSON
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            // Capturar cualquier error en la ejecución y devolverlo en formato JSON
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function searchAll($dato) {
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');
    
            // Obtener el id_usuario desde la sesión
            if (!isset($_SESSION['id_usuario'])) {
                throw new \Exception("Usuario no autenticado.");
            }
            $id_usuario = $_SESSION['id_usuario'];
    
            // Consulta SQL con marcador de posición para el parámetro de búsqueda
            $query = "SELECT * FROM vista_posts_usuario 
                      WHERE (titulo LIKE ? OR contenido LIKE ? OR fecha_creacion LIKE ?) 
                      AND eliminado = 0 
                      ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Preparar los valores a ser vinculados
            $searchParam = "%" . $dato . "%"; // Se agrega '%' para que la búsqueda sea "LIKE"
            $stmt->bind_param('sss', $searchParam, $searchParam, $searchParam);
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si hay posts
            if ($result->num_rows > 0) {
                $posts = [];
    
                // Generar el array de posts
                while ($row = $result->fetch_assoc()) {
                    // Verificar si hay una imagen y convertirla a base64 si existe
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        $imagen = base64_encode($row['imagen']); // Convertir el BLOB a base64
                    }
    
                    // Consulta para verificar si el usuario ha dado 'like' a este post
                    $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                    $stmtLike = $this->conexion->prepare($queryLike);
    
                    if (!$stmtLike) {
                        throw new \Exception("Error al preparar la consulta de likes: " . $this->conexion->error);
                    }
    
                    // Vincular los parámetros de usuario e id_post
                    $stmtLike->bind_param("ii", $id_usuario, $row['id_post']);
                    $stmtLike->execute();
                    $stmtLike->store_result();
    
                    // Determinar si el usuario ha dado 'like' al post
                    $haDadoLike = $stmtLike->num_rows > 0;
    
                    // Cerrar el stmt de la consulta de likes
                    $stmtLike->close();
    
                    // Agregar el post al array de resultados
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen, // La imagen en base64 o null si no existe
                        'id_usuario' => $row['id_usuario'],
                        'nombre' => $row['nombre'],
                        'ciudad' => $row['ciudad'],
                        'estado' => $row['estado'],
                        'ha_dado_like' => $haDadoLike, // Se asigna true o false
                    ];
                }
    
                $stmt->close(); // Liberar recursos
                // Retornar la respuesta en formato JSON
                echo json_encode(['status' => 'success', 'posts' => $posts]);
    
            } else {
                // Si no hay posts, retornar un mensaje en formato JSON
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No se encontraron publicaciones.']);
            }
        } catch (\Exception $e) {
            // Capturar cualquier error en la ejecución y devolverlo en formato JSON
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    
    public function mySearch($dato, $id_usuario) {
        $search = $dato;
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');
    
            // Consulta SQL para obtener los posts con el filtro de búsqueda y usuario
            $query = "SELECT * FROM vista_posts_usuario 
                      WHERE (titulo LIKE ? OR contenido LIKE ? OR fecha_creacion LIKE ?) 
                      AND eliminado = 0 
                      AND id_usuario = ? 
                      ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Preparar los valores para la búsqueda
            $searchParam = "%" . $search . "%";
            $stmt->bind_param('sssi', $searchParam, $searchParam, $searchParam, $id_usuario);
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si hay resultados
            if ($result->num_rows > 0) {
                $posts = [];
    
                // Iterar sobre los resultados
                while ($row = $result->fetch_assoc()) {
                    // Convertir la imagen a base64 si existe
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        $imagen = base64_encode($row['imagen']);
                    }
    
                    // Verificar si el usuario ha dado 'like' al post
                    $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                    $stmtLike = $this->conexion->prepare($queryLike);
                    if (!$stmtLike) {
                        throw new \Exception("Error al preparar la consulta de likes: " . $this->conexion->error);
                    }
    
                    // Vincular parámetros para la consulta de 'likes'
                    $stmtLike->bind_param("ii", $id_usuario, $row['id_post']);
                    $stmtLike->execute();
                    $stmtLike->store_result();
    
                    // Determinar si el usuario ha dado 'like'
                    $haDadoLike = $stmtLike->num_rows > 0;
    
                    // Cerrar el statement de 'likes'
                    $stmtLike->close();
    
                    // Agregar el post al array de resultados
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen,
                        'id_usuario' => $row['id_usuario'],
                        'ha_dado_like' => $haDadoLike
                    ];
                }
    
                $stmt->close(); // Liberar recursos
                echo json_encode(['status' => 'success', 'posts' => $posts]);
            } else {
                // Si no hay resultados
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            // Manejo de errores
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    
    
}
