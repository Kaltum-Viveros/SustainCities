<?php
namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;

include_once __DIR__.'/DataBase.php';

class Update extends DataBase {

    public function __construct($db = 'sustaincities') {
        $this->data = array();
        parent::__construct($db);
    }

    public function updatePost($titulo, $descripcion, $imagen, $id_post) {
        try {
            $this->conexion->beginTransaction();
            $errorMessage = '';

            // Actualizar el post
            $queryPost = "UPDATE post SET titulo = ?, contenido = ? WHERE id_post = ?";
            $stmtPost = $this->conexion->prepare($queryPost);

            if (!$stmtPost->execute([$titulo, $descripcion, $id_post])) {
                throw new \Exception("Error al actualizar el post: " . implode(" ", $stmtPost->errorInfo()));
            }

            // Validar si existe una imagen
            if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
                $imageContent = file_get_contents($imagen['tmp_name']);

                // Verificar si ya existe una imagen asociada al post
                $queryCheckImage = "SELECT COUNT(*) AS count FROM imagenes WHERE id_post = ?";
                $stmtCheckImage = $this->conexion->prepare($queryCheckImage);
                $stmtCheckImage->execute([$id_post]);
                $row = $stmtCheckImage->fetch(\PDO::FETCH_ASSOC);

                if ($row['count'] > 0) {
                    // Actualizar la imagen si ya existe
                    $queryImagen = "UPDATE imagenes SET imagen = ? WHERE id_post = ?";
                } else {
                    // Insertar una nueva imagen si no existe
                    $queryImagen = "INSERT INTO imagenes (imagen, id_post) VALUES (?, ?)";
                }

                // Manejo especial para datos binarios en SQL Server
                $stmtImagen = $this->conexion->prepare($queryImagen);
                $stmtImagen->bindParam(1, $imageContent, \PDO::PARAM_LOB, 0, \PDO::SQLSRV_ENCODING_BINARY);
                $stmtImagen->bindParam(2, $id_post, \PDO::PARAM_INT);

                if (!$stmtImagen->execute()) {
                    throw new \Exception("Error al guardar la imagen: " . implode(" ", $stmtImagen->errorInfo()));
                }
            }

            $this->conexion->commit();
            $this->data = ['status' => 'success', 'message' => 'Post actualizado exitosamente.'];

        } catch (\Exception $e) {
            $this->conexion->rollBack();
            $this->data = ['status' => 'error', 'message' => $e->getMessage()];
        }

        echo json_encode($this->data);
    }
}
?>