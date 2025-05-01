<?php
session_start();
header('Content-Type: application/json');

use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';

try {
    if (!isset($_SESSION['id_usuario'])) {
        // Devuelve un estado que indica que no hay sesión
        echo json_encode([
            'status' => 'no_session'
        ]);
        exit;
    }

    $reader = new Read('sustaincities');
    $userData = $reader->getUserData(
        $_SESSION['id_usuario'],
        $_SESSION['nombre'] ?? '',
        $_SESSION['id_ciudad'] ?? null
    );
    
    echo json_encode($userData);
    
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>