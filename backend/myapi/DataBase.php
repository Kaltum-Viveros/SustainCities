<?php
namespace SustainCities\backend\myapi;
abstract class DataBase {
    protected $conexion;
    protected $data;

    protected function __construct($db, $user = 'root', $pass = 'zorobabel') {
        $this->conexion = new \mysqli('localhost', $user, $pass, $db, 3307);

        if ($this->conexion->connect_error) {
            throw new \Exception('Error de conexión a la base de datos: ' . $this->conexion->connect_error);
        }
    }

    public function getData() {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }

    public function __destruct() {
        if ($this->conexion) {
            $this->conexion->close(); // Cerrar conexión al finalizar
        }
    }
}
