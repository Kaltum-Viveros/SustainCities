<?php
    namespace proyecto\backend\myapi;
    use proyecto\backend\myapi\DataBase;

    include_once __DIR__.'/DataBase.php';

    class Delete extends DataBase{

        public function __construct($db){
            $this->data = array();
            parent::__construct($db);
        }

    }
?>