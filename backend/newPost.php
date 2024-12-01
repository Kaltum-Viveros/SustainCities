<?php
use SustainCities\backend\myapi\Create;
include_once __DIR__.'/myapi/Create.php';
header('Content-Type: application/json');

session_start(); // Asegúrate de que la sesión esté iniciada

// Comprobar si la solicitud es POST y si existe la imagen
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Inicializar el objeto de la clase Create
    $user = new Create('sustaincities');
    
    // Obtener los datos del formulario
    $titulo = $_POST['title']; 
    $descripcion = $_POST['content']; 
    $imagen = $_FILES['image']; 
    $usuario_id = $_SESSION['id_usuario']; // Asegúrate de que el ID del usuario esté en la sesión

    // Llamar a la función para crear el post
    $user->createPost($titulo, $descripcion, $imagen, $usuario_id);

    $user->getData();
}
?>
