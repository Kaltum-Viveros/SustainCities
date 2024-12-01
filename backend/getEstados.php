<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__.'/Read.php';
header('Content-Type: application/json');

try {
    $user = new Read('sustaincities');
    $user->getEstados();
    echo $user->getData(); // Devuelve la respuesta JSON
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
