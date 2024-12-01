<?php 
use SustainCities\backend\myapi\DataBase;
include_once __DIR__.'/myapi/DataBase.php';

class Create extends DataBase {

    public function __construct($db) {
        $this->data = array();
        parent::__construct($db);
    }

    public function saveImage($image) {
        // Comprobar si el archivo fue subido correctamente
        if ($image['error'] === UPLOAD_ERR_OK) {
            // Obtener el contenido de la imagen
            $imageContent = file_get_contents($image['tmp_name']);
            
            // Consultar para insertar la imagen
            $query = "INSERT INTO imagenes (imagen) VALUES (?)";
            $stmt = $this->conexion->prepare($query);
            if ($stmt) {
                // Usar el parámetro binario con 'b' para BLOB
                $stmt->bind_param("b", $null); // Inicializamos el parámetro binario

                // Enviar los datos binarios de la imagen
                $stmt->send_long_data(0, $imageContent);

                // Ejecutar la consulta
                if ($stmt->execute()) {
                    echo "Imagen subida correctamente.";
                } else {
                    echo "Error al insertar la imagen: " . $stmt->error;
                }

                // Cerrar el statement
                $stmt->close();
            } else {
                echo "Error al preparar la consulta: " . $this->conexion->error;
            }
        } else {
            echo "Error al subir la imagen.";
        }
    }
}

// Llamada para procesar la imagen
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $create = new Create('sustaincities');
    $create->saveImage($_FILES['image']);
}
?>
