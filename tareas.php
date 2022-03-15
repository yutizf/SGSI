<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="tareas.css">
	<script type="text/javascript" src="jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="tareas.js"></script>
</head>
<body>
<?php
	$id_tareas=urldecode($_GET['id_tareas']);
	$archivo="./tareas/" . $id_tareas . ".txt";
	
	if($id_tareas<>""){
		$myfile = fopen($archivo, "r");
		$archivo_leido=trim(fread($myfile,filesize($archivo)));
		fclose($myfile);
	}else{
		$archivo_leido="No existe documentacion";
	}
	?>
	<form action="n_general.php" method="POST">
	<textarea id="textarea_tarea_descripcion" name="textarea_tarea_descripcion"><?php echo($archivo_leido)?></textarea>
	<input type="hidden" name="id" id="id_tareas" value="<?php echo($id_tareas) ?>">
	<input type="button" name="grabar_tarea" id="btn_grabar_tarea" value="Grabar">
	</form>
</body>
</html>