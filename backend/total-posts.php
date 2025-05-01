<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';

header('Content-Type: application/json');

try {
    $reader = new Read('sustaincities');
    $total = $reader->getTotalPosts();
    
    // Devuelve directamente el número como JSON
    echo json_encode($total);
    
} catch (Exception $e) {
    // En caso de error, devuelve 0 para evitar errores en el frontend
    echo json_encode(0);
}
?>