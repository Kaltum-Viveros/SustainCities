<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';

header('Content-Type: application/json');

try {
    $reader = new Read('sustaincities');
    $data = $reader->getTopEstados();

    // Devuelve directamente el array de datos que espera tu JavaScript
    echo json_encode($data);

} catch (Exception $e) {
    // En caso de error, devuelve un array vacío para evitar romper el gráfico
    echo json_encode([]);
}
?>