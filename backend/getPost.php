<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__ . '/myapi/Read.php';

// Verificar si 'id_post' está presente en la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $post = new Read('sustaincities');
    $post->getPost($id); 
    $post->getData();
} else {
    echo 'No se ha proporcionado un id_post válido.';
}
?>
