<?php

//$mysqli = mysqli_connect('localhost', 'sgsi', 'xxxxxx', 'xxxxxx');
//$mysqli = mysqli_connect('mysql.hostinger.com.ar', 'u999182147_mysql', 'xxxxxx', 'xxxxxx');
require('configuracion.php');
if ($mysqli->connect_errno) {
   echo "Error al conectarse a la Base de Datos";
}else{

//Quito Cumplimiento a las Tareas que no se actualizaron despues de un tiempo
	$fecha_ahora=date("Y-m-d H:i:s");

	//$fecha_ahora=date();
	$sql="SELECT ID_Tareas FROM dominios_tareas WHERE Fecha_Actualizacion<=DATE_SUB('" . $fecha_ahora . "',INTERVAL 1 MINUTE)";
	$resultado=$mysqli->query($sql);
	if ($mysqli->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$id_tarea=$valores['ID_Tareas'];
			$sql="UPDATE tareas_usuarios SET Cumplimiento=Cumplimiento-10 WHERE ID_Tarea=" . $id_tarea;
			if ($mysqli->query($sql) === TRUE){
			}
			$sql="UPDATE dominios_tareas SET Fecha_Actualizacion='" . $fecha_ahora . "' WHERE ID_Tareas=" . $id_tarea;
			if ($mysqli->query($sql) === TRUE){
			}
		}
	}
	$sql="UPDATE dominios_tareas SET Cumplimiento=0 WHERE Cumplimiento<0";
	if ($mysqli->query($sql) === TRUE){
	}

}
?>