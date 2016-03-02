<?php
include "connection.php";
$data=array();
$res = mysql_query("SELECT * FROM `Test_Events`", GetMyConnection());
while ($row=mysql_fetch_object($res)){
    $data[]=$row;
}
echo json_encode($data);



