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
        
            // Consulta SQL para obtener los posts de la vista
            $query = "SELECT * FROM vista_posts_usuario WHERE eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);

            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }

            // Vincula el parámetro como un entero (id_usuario)
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
                        'id_usuario' => $row['id_usuario'],
                        'nombre' => $row['nombre'],
                        'ciudad' => $row['ciudad'],
                        'estado' => $row['estado'],
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
            $query = "SELECT * FROM vista_posts_usuario WHERE id_usuario = ? AND eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Vincula el parámetro como un entero (id_usuario)
            $stmt->bind_param('i', $id_usuario);
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
        $search = $dato;
        try {
            // Establecer el encabezado adecuado para la respuesta JSON
            header('Content-Type: application/json');
    
            // Consulta SQL con marcador de posición para el parámetro de búsqueda
            $query = "SELECT * FROM vista_posts_usuario WHERE (titulo LIKE ? OR contenido LIKE ? OR fecha_creacion LIKE ?) AND eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Preparar los valores a ser vinculados
            $searchParam = "%" . $search . "%"; // Se agrega '%' para que la búsqueda sea "LIKE"
            $stmt->bind_param('sss', $searchParam, $searchParam, $searchParam); // Vincula los parámetros de búsqueda
    
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
                        'id_usuario' => $row['id_usuario'],
                        'nombre' => $row['nombre'],
                        'ciudad' => $row['ciudad'],
                        'estado' => $row['estado'],
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
    
    public function mySearch($dato, $id_usuario) {
        $search = $dato;
        try {
            header('Content-Type: application/json');
    
            // Consulta SQL actualizada para incluir el filtro de id_usuario
            $query = "SELECT * FROM vista_posts_usuario
                    WHERE (titulo LIKE ? OR contenido LIKE ? OR fecha_creacion LIKE ?)
                    AND eliminado = 0
                    AND id_usuario = ?
                    ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
    
            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
            }
    
            // Preparar los valores a ser vinculados
            $searchParam = "%" . $search . "%"; // Se agrega '%' para que la búsqueda sea "LIKE"
            $stmt->bind_param('ssss', $searchParam, $searchParam, $searchParam, $id_usuario); // Vincula los parámetros
    
            $stmt->execute();
            $result = $stmt->get_result();
    
            if ($result->num_rows > 0) {
                $posts = [];
                while ($row = $result->fetch_assoc()) {
                    $imagen = null;
                    if ($row['imagen'] !== null) {
                        $imagen = base64_encode($row['imagen']);
                    }
    
                    $posts[] = [
                        'id_post' => $row['id_post'],
                        'titulo' => $row['titulo'],
                        'contenido' => $row['contenido'],
                        'fecha_creacion' => $row['fecha_creacion'],
                        'likes' => $row['likes'],
                        'imagen' => $imagen,
                        'id_usuario' => $row['id_usuario']
                    ];
                }
    
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => $posts]);
            } else {
                $stmt->close();
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
    
    
}
