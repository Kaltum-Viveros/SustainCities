
<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';

if (isset($_GET['query'])) {
    $user = new Read('sustaincities');

    $busqueda = $_GET['query'];
    $user->searchAll($busqueda);
    $user->getData();

} else {
    // Si no se envió el parámetro 'query', retornar un mensaje vacío
    echo json_encode([]);
}

?>
