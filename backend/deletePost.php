<?php

use SustainCities\backend\myapi\Delete;
include_once __DIR__.'/myapi/Delete.php';

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $user = new Delete('sustaincities');
    $user->deletePost($id);
    $user->getData();
}
?>