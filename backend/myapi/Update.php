<?php
    namespace SustainCities\backend\myapi;
    use SustainCities\backend\myapi\DataBase;

    include_once __DIR__.'/DataBase.php';

    class Update extends DataBase{

        public function __construct($db){
            $this->data = array();
            parent::__construct($db);
        }
        
        public function updatePost($titulo, $descripcion, $imagen, $id_post) {
            $this->conexion->begin_transaction();
            $error = false;
            $errorMessage = '';
        
            // Actualizar el post
            $queryPost = "UPDATE post SET titulo = ?, contenido = ? WHERE id_post = ?";
            $stmtPost = $this->conexion->prepare($queryPost);
            $stmtPost->bind_param("ssi", $titulo, $descripcion, $id_post);
        
            if (!$stmtPost->execute()) {
                $error = true;
                $errorMessage = "Error al actualizar el post: " . $stmtPost->error;
            } else {
                // Validar si existe una imagen
                if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
                    $imageContent = file_get_contents($imagen['tmp_name']);
        
                    // Verificar si ya existe una imagen asociada al post
                    $queryCheckImage = "SELECT COUNT(*) AS count FROM imagenes WHERE id_post = ?";
                    $stmtCheckImage = $this->conexion->prepare($queryCheckImage);
                    $stmtCheckImage->bind_param("i", $id_post);
                    $stmtCheckImage->execute();
                    $result = $stmtCheckImage->get_result();
                    $row = $result->fetch_assoc();
                    $stmtCheckImage->close();
        
                    if ($row['count'] > 0) {
                        // Actualizar la imagen si ya existe
                        $queryImagen = "UPDATE imagenes SET imagen = ? WHERE id_post = ?";
                    } else {
                        // Insertar una nueva imagen si no existe
                        $queryImagen = "INSERT INTO imagenes (imagen, id_post) VALUES (?, ?)";
                    }
        
                    $stmtImagen = $this->conexion->prepare($queryImagen);
                    $stmtImagen->bind_param("bi", $imageContent, $id_post);
                    $stmtImagen->send_long_data(0, $imageContent);
        
                    if (!$stmtImagen->execute()) {
                        $error = true;
                        $errorMessage = "Error al guardar la imagen: " . $stmtImagen->error;
                    }
        
                    $stmtImagen->close();
                }
            }
        
            // Confirmar o revertir la transacción
            if ($error) {
                $this->conexion->rollback();
                $this->data = array('status' => 'error', 'message' => $errorMessage);
            } else {
                $this->conexion->commit();
                $this->data = array('status' => 'success', 'message' => 'Post actualizado exitosamente.');
            }
        
            $stmtPost->close();
            echo json_encode($this->data);
        }
           
    }
?>