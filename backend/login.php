<?php
use backend\myapi\Create;
header('Content-Type: application/json');

// Leer y decodificar el JSON enviado desde el cliente
$data = json_decode(file_get_contents('php://input'), true);

// Validar que $data no sea nulo y contenga los campos requeridos
if (
    isset($data['correo']) &&
    isset($data['password'])
) {
    $correo = $data['correo'];
    $password = $data['password'];

    // Crear instancia de la clase
    $user = new Create('sustaincities');

    // Registrar al usuario
    $user->loginUser($correo, $password);

    // Obtener la respuesta en JSON y enviarla al cliente
    echo $user->getData();
} else {
    // Enviar error si faltan campos
    echo json_encode(['message' => 'Todos los campos son obligatorios']);
}
