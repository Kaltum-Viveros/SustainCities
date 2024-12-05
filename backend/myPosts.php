<?php

use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';
header('Content-Type: application/json');

// Verificar si la solicitud es GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Iniciar sesión y obtener el ID del usuario (si el usuario está autenticado)
    session_start(); // Si el usuario está autenticado mediante sesión
    $usuario_id = $_SESSION['id_usuario'];

    // Validar que el ID de usuario esté presente
    if (!$usuario_id) {
        echo json_encode(['status' => 'error', 'message' => 'No se encontró el ID de usuario']);
        exit; // Detener la ejecución después de enviar el error
    }

    try {
        // Crear una instancia del objeto Read
        $user = new Read('sustaincities');

        // Llamar a la función para obtener los posts del usuario
        $user->getMyPosts($usuario_id); // Suponiendo que esta función maneja la respuesta

    } catch (\Exception $e) {
        // Capturar cualquier error y devolver una respuesta JSON de error
        echo json_encode(['status' => 'error', 'message' => 'Error al obtener los posts: ' . $e->getMessage()]);
        exit;
    }
}
?>
