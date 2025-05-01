<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';
header('Content-Type: application/json');

try {
    if (!isset($_GET['post_id'])) {
        throw new Exception('No se ha proporcionado el ID del post');
    }
    
    $user = new Read('sustaincities');
    $id_post = filter_var($_GET['post_id'], FILTER_VALIDATE_INT); // Validar y obtener el ID
    
    if ($id_post === false) {
        throw new Exception('El ID del post debe ser un número entero válido');
    }
    
    $user->getComments($id_post); // Obtener comentarios
    
} catch (Exception $e) {
    http_response_code(400); // Cambiado a 400 para errores de solicitud
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}