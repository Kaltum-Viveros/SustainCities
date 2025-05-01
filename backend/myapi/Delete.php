<?php
namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;

include_once __DIR__.'/DataBase.php';

class Delete extends DataBase {

    public function __construct($db = 'sustaincities') {
        $this->data = array();
        parent::__construct($db);
    }

    public function deletePost($id_post) {
        try {
            // Verificar si el post existe y actualizar su estado a 'eliminado'
            $query = "UPDATE post SET eliminado = 1 WHERE id_post = ?";
            $stmt = $this->conexion->prepare($query);

            if ($stmt === false) {
                throw new \PDOException("Error al preparar la consulta");
            }

            // Ejecutar la consulta con parámetros
            if ($stmt->execute([$id_post])) {
                $rowCount = $stmt->rowCount();

                if ($rowCount > 0) {
                    $this->data = [
                        'status' => "success",
                        'message' => "Post eliminado correctamente",
                        'affected_rows' => $rowCount
                    ];
                } else {
                    $this->data = [
                        'status' => "warning",
                        'message' => "No se encontró el post con el ID proporcionado"
                    ];
                }
            } else {
                throw new \PDOException("Error al ejecutar la consulta");
            }

        } catch (\PDOException $e) {
            $this->data = [
                'status' => "error",
                'message' => $e->getMessage(),
                'error_info' => isset($stmt) ? $stmt->errorInfo() : $this->conexion->errorInfo()
            ];
        }

        // Retornar los datos en formato JSON
        header('Content-Type: application/json');
        echo json_encode($this->data);
    }
}