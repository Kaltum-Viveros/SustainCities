<?php
namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;
include_once __DIR__.'/DataBase.php';

class Create extends DataBase {

    public function __construct($db = 'sustaincities') {
        $this->data = array();
        parent::__construct($db);
    }

    public function registerUser($nombre, $id_ciudad, $telefono, $correo, $password) {
        try {
            // Verificar si el correo ya está registrado
            $query = "SELECT id_usuario FROM usuarios WHERE correo = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$correo]);

            if ($stmt->rowCount() > 0) {
                $this->data = ['status' => 'error', 'message' => 'El correo ya está registrado'];
                return $this->getData();
            }

            // Cifrar la contraseña
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Insertar el nuevo usuario
            $query = "INSERT INTO usuarios (nombre, telefono, correo, password, id_ciudad) 
                    VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$nombre, $telefono, $correo, $hashedPassword, $id_ciudad]);

            $this->data = ['status' => 'success', 'message' => 'Usuario registrado exitosamente'];
            return $this->getData();

        } catch (\PDOException $e) {
            $this->data = ['status' => 'error', 'message' => 'Error al registrar el usuario: ' . $e->getMessage()];
            return $this->getData();
        }
    }

    public function loginUser($correo, $password) {
        try {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }

            // Buscar el usuario por correo
            $query = "SELECT * FROM usuarios WHERE correo = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$correo]);
            $user = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$user) {
                $this->data = ['status' => 'error', 'message' => 'Correo o contraseña incorrectos'];
                return $this->getData();
            }

            // Verificar la contraseña
            if (password_verify($password, $user['password'])) {
                $_SESSION['nombre'] = $user['nombre'];
                $_SESSION['id_usuario'] = $user['id_usuario'];
                $_SESSION['id_ciudad'] = $user['id_ciudad'];

                $this->data = [
                    'status' => 'success',
                    'message' => 'Login exitoso',
                    'user' => [
                        'nombre' => $user['nombre'],
                        'id_usuario' => $user['id_usuario'],
                        'id_ciudad' => $user['id_ciudad']
                    ]
                ];
            } else {
                $this->data = ['status' => 'error', 'message' => 'Correo o contraseña incorrectos'];
            }

            return $this->getData();

        } catch (\PDOException $e) {
            $this->data = ['status' => 'error', 'message' => 'Error en el login: ' . $e->getMessage()];
            return $this->getData();
        }
    }

    public function createPost($titulo, $descripcion, $imagen, $usuario_id) {
        try {
            $this->conexion->beginTransaction();
    
            // 1. Insertar el post principal
            $queryPost = "INSERT INTO post (id_usuario, titulo, contenido) VALUES (?, ?, ?)";
            $stmtPost = $this->conexion->prepare($queryPost);
            
            if (!$stmtPost->execute([$usuario_id, $titulo, $descripcion])) {
                throw new \Exception("Error al crear el post: " . implode(" ", $stmtPost->errorInfo()));
            }
    
            // Obtener el ID del post insertado
            $id_post = $this->conexion->lastInsertId();
            if (!$id_post) {
                throw new \Exception("Error al obtener el ID del post");
            }
    
            // 2. Manejar la imagen si existe
            if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
                $imageContent = file_get_contents($imagen['tmp_name']);
                
                $queryImagen = "INSERT INTO imagenes (id_post, imagen) VALUES (?, ?)";
                $stmtImagen = $this->conexion->prepare($queryImagen);
                
                // Manejo especial para datos binarios en SQL Server (igual que en update)
                $stmtImagen->bindParam(1, $id_post, \PDO::PARAM_INT);
                $stmtImagen->bindParam(2, $imageContent, \PDO::PARAM_LOB, 0, \PDO::SQLSRV_ENCODING_BINARY);
                
                if (!$stmtImagen->execute()) {
                    throw new \Exception("Error al insertar la imagen: " . implode(" ", $stmtImagen->errorInfo()));
                }
            }
    
            $this->conexion->commit();
            
            $this->data = [
                'status' => 'success',
                'message' => $imagen ? 'Post creado con imagen exitosamente' : 'Post creado exitosamente',
                'id_post' => $id_post
            ];
    
        } catch (\Exception $e) {
            $this->conexion->rollBack();
            $this->data = [
                'status' => 'error',
                'message' => 'Error al crear el post: ' . $e->getMessage()
            ];
        }
    
        header('Content-Type: application/json');
        echo json_encode($this->data);
    }

    public function toggleLike($id_post) {
        try {
            header('Content-Type: application/json');

            // Verificar si la sesión contiene 'id_usuario'
            if (!isset($_SESSION['id_usuario'])) {
                throw new \Exception('Usuario no autenticado');
            }

            $usuario_id = $_SESSION['id_usuario'];

            // Verificar si el usuario ya ha dado un "like" al post
            $query = "SELECT 1 FROM likes WHERE id_post = ? AND id_usuario = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$id_post, $usuario_id]);

            if ($stmt->rowCount() == true) {
                // Si el "like" ya existe, eliminarlo
                $query = "DELETE FROM likes WHERE id_post = ? AND id_usuario = ?";
                $stmt = $this->conexion->prepare($query);
                $stmt->execute([$id_post, $usuario_id]);

                $query = "UPDATE post SET likes = likes - 1 WHERE id_post = ?";
                $stmt = $this->conexion->prepare($query);
                $stmt->execute([$id_post]);

                echo json_encode(['status' => 'success', 'message' => 'Like removed']);
            } else {
                // Si el "like" no existe, añadirlo
                $query = "INSERT INTO likes (id_post, id_usuario) VALUES (?, ?)";
                $stmt = $this->conexion->prepare($query);
                $stmt->execute([$id_post, $usuario_id]);

                $query = "UPDATE post SET likes = likes + 1 WHERE id_post = ?";
                $stmt = $this->conexion->prepare($query);
                $stmt->execute([$id_post]);

                echo json_encode(['status' => 'success', 'message' => 'Like added']);
            }
        } catch (\Exception $e) {
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function addCommentary($id_post, $comentario, $id_usuario) {
        try {
            $query = "INSERT INTO comentarios (id_post, id_usuario, contenido) VALUES (?, ?, ?)";
            $stmt = $this->conexion->prepare($query);
            $stmt->execute([$id_post, $id_usuario, $comentario]);

            $this->data = ['status' => 'success', 'message' => 'Comentario añadido exitosamente'];
        } catch (\PDOException $e) {
            $this->data = ['status' => 'error', 'message' => 'Error al añadir comentario: ' . $e->getMessage()];
        }

        echo $this->getData();
    }
}
?>