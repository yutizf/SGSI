<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" type="text/css" href="documentacion.css">
	<script type="text/javascript" src="jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="documentacion.js"></script>
</head>
<body>
<?php
	$id_documento=urldecode($_GET['id_dominio']);
	$archivo="./dominios/" . $id_documento . ".txt";
	
	if($id_documento<>""){
		$myfile = fopen($archivo, "r");
		$archivo_leido=trim(fread($myfile,filesize($archivo)));
		fclose($myfile);
	}else{
		$archivo_leido="No existe documentacion";
	}
	?>
	<form action="n_general.php" method="POST">
	<textarea id="textarea_documento" name="textarea_documento"><?php echo($archivo_leido)?></textarea>
	<input type="hidden" name="id" id="id_documento" value="<?php echo($id_documento) ?>">
	<input type="button" name="grabar" id="btn_grabar" value="Grabar">
	</form>
</body>
</html>

