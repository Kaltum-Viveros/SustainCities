<?php
use SustainCities\backend\myapi\Read;
include_once __DIR__.'/myapi/Read.php';

$user = new Read('sustaincities');

$busqueda = $_GET['query'];
$user->searchAll($busqueda);
$user->getData();
?>
