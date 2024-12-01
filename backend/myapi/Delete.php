<?php
    namespace SustainCities\backend\myapi;
    use SustainCities\backend\myapi\DataBase;

    include_once __DIR__.'/DataBase.php';

    class Delete extends DataBase{

        public function __construct($db){
            $this->data = array();
            parent::__construct($db);
        }

    }
?>