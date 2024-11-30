<?php

use backend\myapi\Create;

//crear nuevo post
header('Content-Type: application/json');

// Leer y decodificar el JSON enviado desde el cliente
$data = json_decode(file_get_contents('php://input'), true);




?>