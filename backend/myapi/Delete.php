<?php
namespace SustainCities\backend\myapi;
use SustainCities\backend\myapi\DataBase;

include_once __DIR__.'/DataBase.php';

class Delete extends DataBase {

    public function __construct($db){
        $this->data = array();
        parent::__construct($db);
    }

    public function deletePost($id_post) {
        // Verificar si el post existe y actualizar su estado a 'eliminado'
        $query = "UPDATE post SET eliminado = 1 WHERE id_post = ?";
        $stmt = $this->conexion->prepare($query);
        
        // Comprobar si la preparación de la sentencia fue exitosa
        if ($stmt === false) {
            $this->data['status'] = "error";
            $this->data['message'] = "Error al preparar la consulta: " . mysqli_error($this->conexion);
            echo $this->getData();
            return;
        }

        // Vincular el parámetro y ejecutar
        $stmt->bind_param("i", $id_post);
        
        if ($stmt->execute()) {
            // Si la ejecución es exitosa
            $this->data['status'] = "success";
            $this->data['message'] = "Post eliminado correctamente";
        } else {
            // En caso de error en la ejecución
            $this->data['status'] = "error";
            $this->data['message'] = "Error al eliminar el post: " . mysqli_error($this->conexion);
        }

        // Cerrar el statement
        $stmt->close();

        // Retornar los datos en formato JSON
        echo $this->getData();
    }
}
?>
