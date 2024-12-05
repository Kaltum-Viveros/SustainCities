<?php
use SustainCities\backend\myapi\Create;
include_once __DIR__.'/myapi/Create.php';
header('Content-Type: application/json');

session_start(); // Asegúrate de que la sesión esté iniciada

// Comprobar si la solicitud es POST y si existe la imagen
if (isset($_POST['post_id']) && isset($_POST['comentario'])) {
    $id_post = $_POST['post_id'];
    $comentario = $_POST['comentario'];
    $user = new Create('sustaincities');  
    $id_usuario = $_SESSION['id_usuario']; 
    $user->addCommentary($id_post, $comentario, $id_usuario);

    $user->getData();
}else{
    echo json_encode(['error' => 'No se ha proporcionado el ID del post o el comentario']);
}
?>
