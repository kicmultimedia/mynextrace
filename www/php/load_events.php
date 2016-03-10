<?php
include "connection.php";
$data=array();
$res = mysql_query("SELECT * FROM `events`", GetMyConnection());
while ($row=mysql_fetch_object($res)){
    $data[]=$row;
}
echo json_encode($data);



