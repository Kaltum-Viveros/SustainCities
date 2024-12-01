<?php
namespace backend\myapi;
use backend\myapi\DataBase;

include_once __DIR__.'/DataBase.php';

class Read extends DataBase {

    public function __construct($db) {
        $this->data = array();
        parent::__construct($db);
    }

    public function getEstados() {
        $query = 'SELECT id_estado, nombre_estado FROM estado';
        $stmt = $this->conexion->prepare($query);

        if (!$stmt) {
            throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
        }

        $stmt->execute();
        $result = $stmt->get_result();
        $estados = [];

        while ($row = $result->fetch_assoc()) {
            $estados[] = $row;
        }

        $stmt->close(); // Liberar recursos
        $this->data = $estados;
    }

    public function getCiudades($id_estado) {
        $query = "SELECT id_ciudad, nombre FROM ciudades WHERE id_estado = ?";
        $stmt = $this->conexion->prepare($query);

        if (!$stmt) {
            throw new \Exception("Error al preparar la consulta: " . $this->conexion->error);
        }

        $stmt->bind_param('i', $id_estado); // Vincula el parámetro como un entero
        $stmt->execute();
        $result = $stmt->get_result();
        $ciudades = [];

        while ($row = $result->fetch_assoc()) {
            $ciudades[] = $row;
        }

        $stmt->close(); // Liberar recursos
        $this->data = $ciudades;
    }
}
