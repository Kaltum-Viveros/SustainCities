<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';

session_start(); // Asegúrate de que la sesión esté iniciada

$user = new Read('sustaincities');

$busqueda = $_GET['query'];
$user->searchAll($busqueda);
$user->getData();
?>
