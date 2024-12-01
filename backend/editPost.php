<?php

use SustainCities\backend\myapi\Update;
include_once __DIR__ . '/myapi/Update.php';

header('Content-Type: application/json');

session_start(); // Asegúrate de que la sesión esté iniciada

// Comprobar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Inicializar el objeto de la clase Update
    $user = new Update('sustaincities');

    // Obtener los datos del formulario
    $titulo = $_POST['title'] ?? null; 
    $descripcion = $_POST['content'] ?? null; 
    $id_post = $_POST['post_id'];

    // Validar datos requeridos
    if (empty($titulo) || empty($descripcion)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
        exit;
    }
    // Manejar la imagen si está disponible
    $imagen = isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK 
        ? $_FILES['image'] 
        : null;

    $user->updatePost($titulo, $descripcion, $imagen, $id_post);

    $response = $user->getData();
}
