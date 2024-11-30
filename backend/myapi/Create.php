<?php
    namespace proyecto\backend\myapi;

    include_once __DIR__.'/DataBase.php';

    class Create extends DataBase{

        public function __construct($db){
            $this->data = array();
            parent::__construct($db);
        }

        public function registerUser($nombre, $direccion, $telefono, $correo, $password) {
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
            $query = "INSERT INTO usuarios (nombre, direccion, telefono, correo, password) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("sssss", $nombre, $direccion, $telefono, $correo, $hashedPassword);
        
            if ($stmt->execute()) {
                $this->data = array('message' => 'Usuario registrado exitosamente');
            } else {
                $this->data = array('message' => 'Error al registrar el usuario');
            }
        
            return $this->getData();
        }
        
        
        public function loginUser($correo, $password) {
            // Buscar el usuario por correo
            $query = "SELECT * FROM usuarios WHERE correo = ?";
            $stmt = $this->conexion->prepare($query);
            $stmt->bind_param("s", $correo);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                // Si el correo no existe
                $this->data = array('message' => 'Correo o contraseña incorrectos');
                return $this->getData();
            }
    
            $user = $result->fetch_assoc();
    
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

    }
?>