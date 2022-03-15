<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="tareas_usuarios.css">
	
</head>
<body>
<?php
	$id_tarea_usuario=urldecode($_GET['id_tarea_usuario']);
	
	require('configuracion.php');
	if ($mysqli->connect_errno) {
   		echo "Error al conectarse a la Base de Datos";
	}else{
		$sql="SELECT ID_Tarea FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
		$resultado=$mysqli->query($sql);
		$id_tarea=0;
		if($resultado){
		//if (mysqli_num_rows($resultado)>0) {
			while ($id=$resultado->fetch_assoc()){
				$id_tarea= $id['ID_Tarea'] ;
  					
      		}
		}

	
		$archivo="./tareas/" . $id_tarea . ".txt";
		
		if($id_tarea<>""){
			$myfile = fopen($archivo, "r");
			$archivo_leido=trim(fread($myfile,filesize($archivo)));
			fclose($myfile);
		}else{
			$archivo_leido="No existe documentacion";
		}
	}
?>
	<textarea id="textarea_tarea_descripcion1" name="textarea_tarea_descripcion1" readonly><?php echo($archivo_leido)?></textarea>
</body>
</html>