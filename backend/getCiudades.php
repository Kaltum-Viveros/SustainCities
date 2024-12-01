<?php
use backend\myapi\Read;

include_once __DIR__ . '/myapi/Read.php';

header('Content-Type: application/json');

// Verificar si se recibió el parámetro `id_estado`
if (!isset($_GET['id_estado'])) {
    http_response_code(400); // Código 400: Bad Request
    echo json_encode(['error' => 'El parámetro id_estado es obligatorio.']);
    exit;
}

$id_estado = intval($_GET['id_estado']); // Asegurar que sea un entero

try {
    $user = new Read('sustaincities');
    $user->getCiudades($id_estado); // Llamar a la función getCiudades
    echo $user->getData(); // Retornar la respuesta JSON
} catch (Exception $e) {
    http_response_code(500); // Código 500: Error interno del servidor
    echo json_encode(['error' => $e->getMessage()]);
}
