<?php
    namespace proyecto\backend\myapi;
    abstract class DataBase{
        protected $conexion;
        protected $data;

        protected function __construct($db, $user= 'root',$pass='zorobabel'){
            $this-> conexion = @mysqli_connect(
                'localhost',
                $user,
                $pass,
                $db,
                3307
            );

            if(!$this->conexion){
                die('¡Base de datos NO conectada!');
            }
        }
        
        public function getData(){
            return json_encode($this->data, JSON_PRETTY_PRINT);
        }
    }
?>