<?php
namespace SustainCities\backend\myapi;

abstract class DataBase {
    protected $conexion;
    protected $data;

    protected function __construct($db = 'sustaincities', $user = '', $pass = '') {
        try {
            $this->conexion = new \PDO(
                "sqlsrv:Server=RCRDT;Database=$db",
                $user,
                $pass,
                [
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
                ]
            );

        } catch (\PDOException $e) {
            throw new \Exception('Error al conectar con SQL Server: ' . $e->getMessage());
        }
    }

    public function getData() {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }

    public function __destruct() {
        $this->conexion = null;
    }
}