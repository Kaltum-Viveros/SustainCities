<?php

use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';
header('Content-Type: application/json');

// Verificar si la solicitud es GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Iniciar sesión y obtener el ID del usuario (si el usuario está autenticado)
    session_start(); // Si el usuario está autenticado mediante sesión

    try {
        // Crear una instancia del objeto Read
        $user = new Read('sustaincities');

        // Llamar a la función para obtener los posts del usuario
        $user->postInicio(); // Suponiendo que esta función maneja la respuesta

    } catch (\Exception $e) {
        // Capturar cualquier error y devolver una respuesta JSON de error
        echo json_encode(['status' => 'error', 'message' => 'Error al obtener los posts: ' . $e->getMessage()]);
        exit;
    }
}
?>