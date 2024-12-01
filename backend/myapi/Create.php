<?php
    namespace backend\myapi;

    use backend\myapi\DataBase;

    class Create extends DataBase{

        public function __construct($db){
            $this->data = array();
            parent::__construct($db);
        }

        public function registerUser($nombre, $id_ciudad, $telefono, $correo, $password) {
            // Verificar si el correo ya está registrado
            $query = "SELECT * FROM usuarios WHERE correo = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("s", $correo);
            $stmt->execute();
            $result = $stmt->get_result();
        
            if ($result->num_rows > 0) {
                // Si el correo ya existe, devolver un mensaje
                $this->data = array('message' => 'El correo ya está registrado');
                return $this->getData();
            }
        
            // Cifrar la contraseña
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        
            // Insertar el nuevo usuario
            $query = "INSERT INTO usuarios (nombre, telefono, correo, password, id_ciudad) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("sssss", $nombre, $telefono, $correo, $hashedPassword, $id_ciudad);
        
            if ($stmt->execute()) {
                $this->data = array('message' => 'Usuario registrado exitosamente');
            } else {
                $this->data = array('message' => 'Error al registrar el usuario');
            }
        
            return $this->getData();
        }
        
        
        public function loginUser($correo, $password) {
            // Iniciar la sesión si no está iniciada
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
        
            // Buscar el usuario por correo
            $query = "SELECT * FROM usuarios WHERE correo = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("s", $correo);
            $stmt->execute();
            $result = $stmt->get_result();
        
            // Verificar si se encontró el usuario
            if ($result->num_rows === 0) {
                $this->data = array('message' => 'Correo o contraseña incorrectos');
                return $this->getData();
            }
        
            // Obtener los datos del usuario
            $user = $result->fetch_assoc();
        
            // Guardar el nombre en la sesión
            $_SESSION['nombre'] = $user['nombre'];
            $_SESSION['id_ciudad'] = $user['id_ciudad'];
        
            // Verificar la contraseña
            if (password_verify($password, $user['password'])) {
                // Si la contraseña es correcta
                $this->data = array('message' => 'Login exitoso', 'user' => $user);
            } else {
                // Si la contraseña es incorrecta
                $this->data = array('message' => 'Correo o contraseña incorrectos');
            }
        
            return $this->getData();
        }
        

        public function createPost($titulo, $descripcion, $imagenes, $usuario_id) {
            // Inicia una transacción
            $this->conexion->begin_transaction();
            $error = false;
        
            // Insertar el nuevo post
            $queryPost = "INSERT INTO post (titulo, descripcion, usuario_id) VALUES (?, ?, ?)";
            $stmtPost = $this->conexion->prepare($queryPost);
            $stmtPost->bind_param("ssi", $titulo, $descripcion, $usuario_id);
        
            if (!$stmtPost->execute()) {
                $error = true;
                $errorMessage = "Error al crear el post: " . $stmtPost->error;
            } else {
                // Obtener el id_post generado
                $id_post = $this->conexion->insert_id;
        
                // Insertar las imágenes asociadas
                $queryImagen = "INSERT INTO imagen (id_post, imagen) VALUES (?, ?)";
                $stmtImagen = $this->conexion->prepare($queryImagen);
        
                foreach ($imagenes as $imagen) {
                    $stmtImagen->bind_param("ib", $id_post, $imagen);
                    if (!$stmtImagen->execute()) {
                        $error = true;
                        $errorMessage = "Error al insertar imagen: " . $stmtImagen->error;
                        break;
                    }
                }
            }
        
            if ($error) {
                // Revertir la transacción en caso de error
                $this->conexion->rollback();
                $this->data = array('message' => $errorMessage);
            } else {
                // Confirmar la transacción si no hay errores
                $this->conexion->commit();
                $this->data = array('message' => 'Post y sus imágenes creados exitosamente');
            }
            return $this->getData();
        }
        
    }
?>