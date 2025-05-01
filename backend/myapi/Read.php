<?php
namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;
include_once __DIR__.'/DataBase.php';

class Read extends DataBase {

    public function __construct($db = 'sustaincities') {
        $this->data = array();
        parent::__construct($db);
    }

    public function getEstados() {
        try {
            $query = 'SELECT id_estado, nombre_estado FROM estado';
            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                $errorInfo = $this->conexion->errorInfo();
                throw new \Exception("Error al ejecutar la consulta: " . $errorInfo[2]);
            }

            $this->data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $this->getData();

        } catch (\PDOException $e) {
            throw new \Exception("Error en getEstados: " . $e->getMessage());
        }
    }

    public function getCiudades($id_estado) {
        try {
            $query = "SELECT id_ciudad, nombre FROM ciudades WHERE id_estado = ?";
            $stmt = $this->conexion->prepare($query);

            if (!$stmt->execute([$id_estado])) {
                throw new \Exception("Error al ejecutar la consulta: " . implode(" ", $stmt->errorInfo()));
            }

            $this->data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $this->getData();

        } catch (\PDOException $e) {
            throw new \Exception("Error al obtener ciudades: " . $e->getMessage());
        }
    }

    public function postInicio() {
        try {
            header('Content-Type: application/json');

            if (!isset($_SESSION['id_usuario'])) {
                throw new \Exception("Usuario no autenticado");
            }

            $id_usuario = $_SESSION['id_usuario'];

            // Consulta principal para obtener posts
            $query = "SELECT * FROM vista_posts_usuario WHERE eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                throw new \Exception("Error en consulta principal: " . implode(" ", $this->conexion->errorInfo()));
            }

            $posts = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                // Procesar imagen
                $imagen = null;
                if (!empty($row['imagen'])) {
                    $imagen = base64_encode($row['imagen']);
                }

                // Verificar like
                $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                $stmtLike = $this->conexion->prepare($queryLike);
                $stmtLike->execute([$id_usuario, $row['id_post']]);
                $haDadoLike = ($stmtLike->rowCount() == true);

                $posts[] = [
                    'id_post' => $row['id_post'],
                    'titulo' => $row['titulo'],
                    'contenido' => $row['contenido'],
                    'fecha_creacion' => $row['fecha_creacion'],
                    'likes' => $row['likes'],
                    'imagen' => $imagen,
                    'id_usuario' => $row['id_usuario'],
                    'nombre' => $row['nombre'],
                    'ciudad' => $row['ciudad'],
                    'estado' => $row['estado'],
                    'ha_dado_like' => $haDadoLike
                ];
            }

            echo json_encode([
                'status' => 'success',
                'posts' => $posts ?: 'No tienes publicaciones.'
            ]);

        } catch (\Exception $e) {
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getMyPosts($id_usuario) {
        try {
            header('Content-Type: application/json');

            $query = "SELECT * FROM vista_posts_usuario WHERE id_usuario = ? AND eliminado = 0 ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);
            if (!$stmt->execute([$id_usuario])) {
                throw new \Exception("Error al ejecutar la consulta: " . implode(" ", $stmt->errorInfo()));
            }

            $posts = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $imagen = null;
                if (!empty($row['imagen'])) {
                    $imagen = base64_encode($row['imagen']);
                }

                $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                $stmtLike = $this->conexion->prepare($queryLike);
                $stmtLike->execute([$id_usuario, $row['id_post']]);
                $haDadoLike = ($stmtLike->rowCount() == true);

                $posts[] = [
                    'id_post' => $row['id_post'],
                    'titulo' => $row['titulo'],
                    'contenido' => $row['contenido'],
                    'fecha_creacion' => $row['fecha_creacion'],
                    'likes' => $row['likes'],
                    'imagen' => $imagen,
                    'id_usuario' => $row['id_usuario'],
                    'nombre' => $row['nombre'],
                    'ciudad' => $row['ciudad'],
                    'estado' => $row['estado'],
                    'ha_dado_like' => $haDadoLike,
                ];
            }

            echo json_encode(['status' => 'success', 'posts' => $posts ?: 'No tienes publicaciones.']);

        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function getPost($id_post) {
        try {
            header('Content-Type: application/json');

            $query = "SELECT * FROM vista_posts_usuario WHERE id_post = ?";
            $stmt = $this->conexion->prepare($query);
            if (!$stmt->execute([$id_post])) {
                throw new \Exception("Error al ejecutar la consulta: " . implode(" ", $stmt->errorInfo()));
            }

            $posts = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $imagen = null;
                if (!empty($row['imagen'])) {
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

            echo json_encode(['status' => 'success', 'posts' => $posts ?: 'No tienes publicaciones.']);

        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function searchAll($dato) {
        try {
            header('Content-Type: application/json');

            if (!isset($_SESSION['id_usuario'])) {
                throw new \Exception("Usuario no autenticado.");
            }
            $id_usuario = $_SESSION['id_usuario'];

            $query = "SELECT * FROM vista_posts_usuario
                    WHERE (titulo LIKE ? OR contenido LIKE ? OR CONVERT(VARCHAR, fecha_creacion, 120) LIKE ?)
                    AND eliminado = 0
                    ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);

            $searchParam = "%" . $dato . "%";
            $stmt->execute([$searchParam, $searchParam, $searchParam]);

            $posts = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $imagen = $row['imagen'] !== null ? base64_encode($row['imagen']) : null;

                $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                $stmtLike = $this->conexion->prepare($queryLike);
                $stmtLike->execute([$id_usuario, $row['id_post']]);
                $haDadoLike = ($stmtLike->rowCount() == true);

                $posts[] = [
                    'id_post' => $row['id_post'],
                    'titulo' => $row['titulo'],
                    'contenido' => $row['contenido'],
                    'fecha_creacion' => $row['fecha_creacion'],
                    'likes' => $row['likes'],
                    'imagen' => $imagen,
                    'id_usuario' => $row['id_usuario'],
                    'nombre' => $row['nombre'],
                    'ciudad' => $row['ciudad'],
                    'estado' => $row['estado'],
                    'ha_dado_like' => $haDadoLike,
                ];
            }

            if (count($posts) > 0) {
                echo json_encode(['status' => 'success', 'posts' => $posts]);
            } else {
                echo json_encode(['status' => 'error', 'posts' => 'No se encontraron publicaciones.']);
            }
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function mySearch($dato, $id_usuario) {
        try {
            header('Content-Type: application/json');

            $query = "SELECT * FROM vista_posts_usuario
                    WHERE (titulo LIKE ? OR contenido LIKE ? OR CONVERT(VARCHAR, fecha_creacion, 120) LIKE ?)
                    AND eliminado = 0
                    AND id_usuario = ?
                    ORDER BY fecha_creacion DESC";
            $stmt = $this->conexion->prepare($query);

            $searchParam = "%" . $dato . "%";
            $stmt->execute([$searchParam, $searchParam, $searchParam, $id_usuario]);

            $posts = [];
            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                $imagen = $row['imagen'] !== null ? base64_encode($row['imagen']) : null;

                $queryLike = "SELECT 1 FROM likes WHERE id_usuario = ? AND id_post = ?";
                $stmtLike = $this->conexion->prepare($queryLike);
                $stmtLike->execute([$id_usuario, $row['id_post']]);
                $haDadoLike = ($stmtLike->rowCount() == true);

                $posts[] = [
                    'id_post' => $row['id_post'],
                    'titulo' => $row['titulo'],
                    'contenido' => $row['contenido'],
                    'fecha_creacion' => $row['fecha_creacion'],
                    'likes' => $row['likes'],
                    'nombre' => $row['nombre'],
                    'ciudad' => $row['ciudad'],
                    'estado' => $row['estado'],
                    'imagen' => $imagen,
                    'id_usuario' => $row['id_usuario'],
                    'ha_dado_like' => $haDadoLike
                ];
            }

            if (count($posts) > 0) {
                echo json_encode(['status' => 'success', 'posts' => $posts]);
            } else {
                echo json_encode(['status' => 'success', 'posts' => 'No tienes publicaciones.']);
            }
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function getComments($id_post) {
        try {
            header('Content-Type: application/json');

            // Consulta SQL para obtener los comentarios de un post
            $query = "SELECT
                        c.id_comentario,
                        c.contenido,
                        c.fecha_creacion,
                        u.id_usuario,
                        u.nombre AS nombre_usuario,
                        ci.nombre AS ciudad,
                        e.nombre_estado AS estado
                    FROM comentarios c
                    JOIN usuarios u ON c.id_usuario = u.id_usuario
                    LEFT JOIN ciudades ci ON u.id_ciudad = ci.id_ciudad
                    LEFT JOIN estado e ON ci.id_estado = e.id_estado
                    WHERE c.id_post = ?
                    ORDER BY c.fecha_creacion DESC";

            $stmt = $this->conexion->prepare($query);

            if (!$stmt) {
                throw new \Exception("Error al preparar la consulta: " . implode(" ", $this->conexion->errorInfo()));
            }

            // Ejecutar la consulta con parámetros
            if (!$stmt->execute([$id_post])) {
                throw new \Exception("Error al ejecutar la consulta: " . implode(" ", $stmt->errorInfo()));
            }

            // Obtener todos los resultados
            $comentarios = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            if (empty($comentarios)) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'No hay comentarios para este post',
                    'comentarios' => []
                ]);
                return;
            }

            // Formatear los datos de respuesta
            $response = [];
            foreach ($comentarios as $row) {
                $response[] = [
                    'id_comentario' => $row['id_comentario'],
                    'contenido' => $row['contenido'],
                    'fecha_creacion' => $row['fecha_creacion'],
                    'id_usuario' => $row['id_usuario'],
                    'nombre' => $row['nombre_usuario'],
                    'ciudad' => $row['ciudad'],
                    'estado' => $row['estado']
                ];
            }

            echo json_encode([
                'status' => 'success',
                'comentarios' => $response
            ]);

        } catch (\Exception $e) {
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getTopEstados() {
        try {
            $query = "
                SELECT TOP 5
                    estado,
                    COUNT(id_post) AS num_aportaciones
                FROM
                    vista_posts_usuario
                WHERE
                    eliminado = 0
                GROUP BY
                    estado
                ORDER BY
                    num_aportaciones DESC
            ";

            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                return []; // Devuelve array vacío si hay error
            }

            $resultados = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Devuelve solo el array de datos sin estructura adicional
            return $resultados ?: [];

        } catch (\PDOException $e) {
            return []; // Devuelve array vacío en caso de excepción
        }
    }

    public function getTopCiudades() {
        try {
            $query = "
                SELECT TOP 5
                    ciudad,
                    COUNT(id_post) AS num_aportaciones
                FROM
                    vista_posts_usuario
                WHERE
                    eliminado = 0
                GROUP BY
                    ciudad
                ORDER BY
                    num_aportaciones DESC
            ";

            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                return []; // Devuelve array vacío si hay error
            }

            $resultados = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Devuelve solo el array de datos sin estructura adicional
            return $resultados ?: [];

        } catch (\PDOException $e) {
            return []; // Devuelve array vacío en caso de excepción
        }
    }

    public function getTotalPosts() {
        try {
            $query = "SELECT COUNT(*) AS total FROM usuarios";

            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                return 0; // Devuelve 0 si hay error
            }

            $resultado = $stmt->fetch(\PDO::FETCH_ASSOC);

            // Devuelve solo el número
            return (int)$resultado['total'] ?? 0;

        } catch (\PDOException $e) {
            return 0; // Devuelve 0 en caso de excepción
        }
    }

    public function getUsuariosActivos() {
        try {
            $query = "
                SELECT TOP 5
                    nombre,
                    COUNT(id_post) AS num_aportaciones
                FROM
                    vista_posts_usuario
                WHERE
                    eliminado = 0
                GROUP BY
                    nombre
                ORDER BY
                    num_aportaciones DESC
            ";

            $stmt = $this->conexion->query($query);

            if ($stmt === false) {
                return []; // Devuelve array vacío si hay error
            }

            $resultados = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // Devuelve solo el array de datos sin estructura adicional
            return $resultados ?: [];

        } catch (\PDOException $e) {
            return []; // Devuelve array vacío en caso de excepción
        }
    }

    public function getUserData($userId, $nombre, $idCiudad) {
        try {
            // Validar que el usuario existe (opcional pero recomendado)
            $query = "SELECT 1 FROM usuarios WHERE id_usuario = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$userId]);
            
            if (!$stmt->fetch()) {
                throw new \Exception("Usuario no encontrado");
            }
    
            // Resto de la lógica existente...
            $ciudad = "Ciudad desconocida";
            if ($idCiudad) {
                $query = "SELECT nombre FROM ciudades WHERE id_ciudad = ?";
                $stmt = $this->conexion->prepare($query);
                $stmt->execute([$idCiudad]);
                $result = $stmt->fetch(\PDO::FETCH_ASSOC);
                if ($result) {
                    $ciudad = $result['nombre'];
                }
            }
    
            $primerNombre = explode(' ', $nombre)[0];
    
            return [
                'status' => 'success',
                'data' => [
                    'primer_nombre' => $primerNombre,
                    'ciudad' => $ciudad,
                    'nombre_completo' => $nombre,
                    'id_usuario' => $userId
                ]
            ];
    
        } catch (\PDOException $e) {
            throw new \Exception("Error al obtener datos de usuario: " . $e->getMessage());
        }
    }
}
?>