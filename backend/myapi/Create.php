<?php

 namespace SustainCities\backend\myapi;
 use SustainCities\backend\myapi\DataBase;
 include_once __DIR__.'/DataBase.php';

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
        
            // Verificar la contraseña
            if (password_verify($password, $user['password'])) {
                // Si la contraseña es correcta, guardamos la sesión
                $_SESSION['nombre'] = $user['nombre'];
                $_SESSION['id_usuario'] = $user['id_usuario'];
                $_SESSION['id_ciudad'] = $user['id_ciudad'];
        
                // Responder con mensaje de éxito y los datos del usuario
                $this->data = array('message' => 'Login exitoso', 'user' => array(
                    'nombre' => $user['nombre'],
                    'id_usuario' => $user['id_usuario'],
                    'id_ciudad' => $user['id_ciudad']
                ));
            } else {
                // Si la contraseña es incorrecta
                $this->data = array('message' => 'Correo o contraseña incorrectos');
            }
        
            return $this->getData();
        }      

        public function createPost($titulo, $descripcion, $imagen, $usuario_id) {
            // Inicia una transacción
            $this->conexion->begin_transaction();
            $error = false;
            $errorMessage = '';
        
            // Insertar el nuevo post
            $queryPost = "INSERT INTO post (id_usuario, titulo, contenido) VALUES (?, ?, ?)";
            $stmtPost = $this->conexion->prepare($queryPost);
            $stmtPost->bind_param("iss", $usuario_id, $titulo, $descripcion);
        
            if (!$stmtPost->execute()) {
                $error = true;
                $errorMessage = "Error al crear el post desde linea 102: " . $stmtPost->error;
            } else {
                // Obtener el id_post generado
                $id_post = $this->conexion->insert_id;
                if (!$id_post) {
                    $error = true;
                    $errorMessage = "Error al obtener el ID del post.";
                }
                
                // Validar si existe una imagen
                if ($imagen) {
                    // Comprobar si el archivo de imagen fue subido correctamente
                    if ($imagen['error'] === UPLOAD_ERR_OK) {
                        // Obtener el contenido binario de la imagen
                        $imageContent = file_get_contents($imagen['tmp_name']);
                        
                        // Insertar la imagen asociada al post
                        $queryImagen = "INSERT INTO imagenes (id_post, imagen) VALUES (?, ?)";
                        $stmtImagen = $this->conexion->prepare($queryImagen);
                        
                        // Vinculamos el id_post y el contenido binario de la imagen
                        $stmtImagen->bind_param("ib", $id_post, $null); // 'b' se usa para BLOB, pero necesitamos usar 'i' para el ID y el tipo de datos binarios por separado
                        
                        // Enviar los datos binarios de la imagen
                        $stmtImagen->send_long_data(1, $imageContent);
        
                        if (!$stmtImagen->execute()) {
                            $error = true;
                            $errorMessage = "Error al insertar la imagen: " . $stmtImagen->error;
                        }
        
                        $stmtImagen->close();
                    } else {
                        $error = true;
                        $errorMessage = "Error al subir la imagen.";
                    }
                }
            }
        
            // Verificar si hubo errores
            if ($error) {
                // Revertir la transacción en caso de error
                $this->conexion->rollback();
                $this->data = array('status' => 'error', 'message' => $errorMessage);
            } else {
                // Confirmar la transacción si no hay errores
                $this->conexion->commit();
                $this->data = array('status' => 'success', 'message' => 'Post creado exitosamente con imagen.');
            }
        
            // Cerrar el statement del post
            $stmtPost->close();
        
            echo $this->getData();
        }        
    }          
?>