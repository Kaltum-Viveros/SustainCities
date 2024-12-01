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
            // Inicia una transacción
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
                    // Obtener el contenido binario de la imagen
                    $imageContent = file_get_contents($imagen['tmp_name']);
        
                    // Actualizar la imagen asociada al post
                    $queryImagen = "UPDATE imagenes SET imagen = ? WHERE id_post = ?";
                    $stmtImagen = $this->conexion->prepare($queryImagen);
                    $stmtImagen->bind_param("bi", $imageContent, $id_post);
        
                    // Enviar los datos binarios de la imagen
                    $stmtImagen->send_long_data(0, $imageContent);
        
                    if (!$stmtImagen->execute()) {
                        $error = true;
                        $errorMessage = "Error al actualizar la imagen: " . $stmtImagen->error;
                    }
        
                    $stmtImagen->close();
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
                $this->data = array('status' => 'success', 'message' => 'Post actualizado exitosamente.');
            }
        
            // Cerrar el statement del post
            $stmtPost->close();
        
            echo json_encode($this->data);
        }          
    }
?>