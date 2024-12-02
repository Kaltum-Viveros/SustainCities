<?php
use SustainCities\backend\myapi\Create;
include_once __DIR__.'/myapi/Create.php';
header('Content-Type: application/json');

session_start(); // Asegúrate de que la sesión esté iniciada

// Comprobar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Inicializar el objeto de la clase Create
    $user = new Create('sustaincities');
    
    // Obtener el ID de la publicación y el ID de usuario desde la solicitud POST
    $data = json_decode(file_get_contents('php://input'), true);
    $id_post = $data['id_post'] ?? null;
    $id_usuario = $_SESSION['id_usuario'] ?? null;

    if ($id_post && $id_usuario) {
        // Llamar a la función para manejar el "like"
        $user->toggleLike($id_post, $id_usuario);

        // Llamar a la función para obtener los datos actualizados, si es necesario
        $user->getData();
    } else {
        // Si falta el ID de la publicación o el ID del usuario, devolver un error
        echo json_encode(['status' => 'error', 'message' => 'Datos insuficientes']);
    }
}
?>