<?php
use proyecto\backend\myapi\Create;
include_once __DIR__ . '/myapi/Create.php';

header('Content-Type: application/json');

// Leer y decodificar el JSON enviado desde el cliente
$data = json_decode(file_get_contents('php://input'), true);

// Validar que $data no sea nulo y contenga los campos requeridos
if (
    isset($data['nombre']) &&
    isset($data['id_ciudad']) &&
    isset($data['telefono']) &&
    isset($data['correo']) &&
    isset($data['password'])
    
) 
{
    $nombre = $data['nombre'];
    $direccion = $data['direccion'];
    $telefono = $data['telefono'];
    $correo = $data['correo'];
    $password = $data['password'];
    
    // Crear instancia de la clase
    $user = new Create('sustaincities');

    // Registrar al usuario
    $user->registerUser($nombre, $id_ciudad, $telefono, $correo, $password);

    // Obtener la respuesta en JSON y enviarla al cliente
    echo $user->getData();
} else {
    // Enviar error si faltan campos
    var_dump($data);
    echo json_encode(['message' => 'Todos los campos son obligatorios']);
}
