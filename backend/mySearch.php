<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';

$user = new Read('sustaincities');

session_start(); 

$busqueda = $_GET['query'];
$id_usuario = $_SESSION['id_usuario']; // Obtener el ID de usuario de la sesión
$user->mySearch($busqueda, $id_usuario); // Pasar el ID de usuario al método

?>