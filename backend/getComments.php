<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';
header('Content-Type: application/json');

try {
    if (!isset($_GET['post_id'])) {
        throw new Exception('No se ha proporcionado el ID del post');
    }
    $user = new Read('sustaincities');
    $id_post = $_GET['post_id']; // Obtener el ID del post
    $user->getComments($id_post); // Obtener comentarios
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
