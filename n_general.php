<?php 
//OPERACIONES
  //a - Alta de Normativa General
  //ad - Alta de Dominio
  //l - Listado de Normativa General
  //b - Baja de Normativa General
  //m - Modificacion de Normativa General
  //ld - Listado de Dominios
  //ln - Listado de Normativa General para ABM de Dominios (Select)
  //md - Modificacion de Dominio
  //bd - Baja de Dominio
  //mdoc - Modifica documentacion
  //lt - Listado de Tareas
  //mt - Modificacion de Tareas
  //bt - Baja de Tarea
  //at - Alta de Tarea
  //ltu - Lista Tareas de Usuarios
  //atu - Alta Tarea Usuario

//$mysqli = mysqli_connect('localhost', 'sgsi', 'sgsi123', 'sgsi');
//$mysqli = mysqli_connect('mysql.hostinger.com.ar', 'u999182147_mysql', 'colectivo', 'u999182147_base1');
require('configuracion.php');
if ($mysqli->connect_errno) {
   echo "Error al conectarse a la Base de Datos";
}else{
	//echo "Conexion Exitosa";



$operacion=urldecode($_POST['operacion']);
if($operacion=='a'){
	$normativa_general=urldecode($_POST['normativa_general']);
	$peso=urldecode($_POST['peso']);
	$sql="INSERT INTO normativas_general (Normativa_General,Peso) VALUES ('" . $normativa_general . "'," . $peso . ")";
	if ($mysqli->query($sql) === TRUE) $ID = $mysqli->insert_id; //inserto registro y obtengo el AutoID
	$Json=array('ID_Normativa_General' => $ID, 'Normativa_General' => $normativa_general);
	//echo json_encode($Json);
	trae_normativas_general();
}elseif ($operacion=='b') {
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	$sql="DELETE FROM normativas_general WHERE ID_Normativa_General=" . $id_normativa_general;
	if ($mysqli->query($sql) === TRUE){
		$sql="SELECT ID_Dominio FROM normativas_dominios WHERE ID_Normativa_General=" . $id_normativa_general;
		$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)>0) {
			while ($id_dominio_borrar=$resultado->fetch_assoc()){
      			$id_dominio= $id_dominio_borrar['ID_Dominio'] ;
      			$borrado=unlink("./dominios/" . $id_dominio . ".txt");

      			$sql="SELECT ID_Tareas FROM dominios_tareas WHERE ID_Dominio=" . $id_dominio;
				$resultado1=$mysqli->query($sql);
				if (mysqli_num_rows($resultado)>0) {
					while ($id_tarea_borrar=$resultado1->fetch_assoc()){
      					$id_tarea= $id_tarea_borrar['ID_Tareas'] ;
      					$borrado=unlink("./tareas/" . $id_tarea . ".txt");
      					
      					$sql="DELETE FROM tareas_usuarios WHERE ID_Tarea=" . $id_tarea;
      					if($mysqli->query($sql)== TRUE){
      					
      					}

      				}
				}
				$sql="DELETE FROM dominios_tareas WHERE ID_Dominio=" . $id_dominio;
      					if($mysqli->query($sql)== TRUE){

      					}

      		}
		}
		$sql="DELETE FROM normativas_dominios WHERE ID_Normativa_General=" . $id_normativa_general;
		if($mysqli->query($sql)== TRUE){
			trae_normativas_general();
		}
	}
}elseif ($operacion=='m') {
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	$normativa_general=urldecode($_POST['normativa_general']);
	$peso=urldecode($_POST['peso']);
	$sql="UPDATE normativas_general SET Normativa_General='" . $normativa_general . "',Peso=" . $peso . " WHERE ID_Normativa_General=" . $id_normativa_general;
	if ($mysqli->query($sql) === TRUE){
		trae_normativas_general();
	}
}elseif ($operacion=="l" || $operacion=="ln") {
	trae_normativas_general();
}
elseif ($operacion=="ad") {
	$dominio=urldecode($_POST['dominio']);
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	$peso_dominio=urldecode($_POST['peso_dominio']);
	$sql="INSERT INTO normativas_dominios (ID_Normativa_General,Dominio,Peso) VALUES (" . $id_normativa_general . ",'" .$dominio . "'," . $peso_dominio . ")";
	if ($mysqli->query($sql) === TRUE) $ID = $mysqli->insert_id; //inserto registro y obtengo el AutoID
	$Json=array('ID_Dominio' => $ID, 'Dominio' => $dominio);
	//echo json_encode($Json);
	trae_dominios($id_normativa_general);
	//Genero TXT del Dominio
	$archivo_dominio = fopen("./dominios/" . $ID . ".txt", "w");
	fwrite($archivo_dominio, $dominio);
	fclose($archivo_dominio);
}elseif ($operacion=="ld") {
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	trae_dominios($id_normativa_general);
}elseif ($operacion=='bd') {
	$id_dominio=urldecode($_POST['id_dominio']);
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	$sql="DELETE FROM normativas_dominios WHERE ID_Dominio=" . $id_dominio;
	if ($mysqli->query($sql) === TRUE){
		trae_dominios($id_normativa_general);
		unlink("./dominios/" . $id_dominio . ".txt");
		$sql="SELECT ID_Tareas FROM dominios_tareas WHERE ID_Dominio=" . $id_dominio;
		$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)>0) {
			while ($id_tarea_borrar=$resultado->fetch_assoc()){
      			$id_tarea= $id_tarea_borrar['ID_Tareas'] ;
      			unlink("./tareas/" . $id_tarea . ".txt");
      			$sql="DELETE FROM tareas_usuarios WHERE ID_Tarea=" . $id_tarea;
      			if ($mysqli->query($sql) === TRUE){

				}
      		}
		}
		$sql="DELETE FROM dominios_tareas WHERE ID_Dominio=" . $id_dominio;
		if ($mysqli->query($sql) === TRUE){

		}

	}
}elseif ($operacion=='md') {
	$id_dominio=urldecode($_POST['id_dominio']);
	$id_normativa_general=urldecode($_POST['id_normativa_general']);
	$peso_dominio=urldecode($_POST['peso']);
	$dominio=urldecode($_POST['dominio']);
	$sql="UPDATE normativas_dominios SET Dominio='" . $dominio . "', Peso=" . $peso_dominio . " WHERE ID_Dominio=" . $id_dominio;
	if ($mysqli->query($sql) === TRUE){
		trae_dominios($id_normativa_general);
	}
}elseif ($operacion=="mdoc") {
	$dominio=urldecode($_POST['dominio']);
	$id_dominio=urldecode($_POST['id_dominio']);
	$archivo_dominio = fopen("./dominios/" . $id_dominio . ".txt", "w");
	fwrite($archivo_dominio, $dominio);
	fclose($archivo_dominio);
}elseif ($operacion=="at") {
	$id_dominio=urldecode($_POST['id_dominio']);
	$peso=urldecode($_POST['peso']);
	$tarea=urldecode($_POST['tarea']);
	$sql="INSERT INTO dominios_tareas (ID_Dominio,Peso_Tarea,Tarea,Fecha_Actualizacion) VALUES ('" . $id_dominio . "'," . $peso . ",'" . $tarea . "','" .$fecha_ahora . "')";
	if ($mysqli->query($sql) === TRUE) $ID = $mysqli->insert_id; //inserto registro y obtengo el AutoID
	$Json=array('ID_Tarea' => $ID, 'ID_Dominio' => $id_dominio);
	//echo json_encode($Json);
	trae_tareas($id_dominio);
	//Genero TXT de la Tarea
	$archivo_tarea = fopen("./tareas/" . $ID . ".txt", "w");
	fwrite($archivo_tarea, $tarea);
	fclose($archivo_tarea);
}elseif ($operacion=="lt") {
	$id_dominio=urldecode($_POST['id_dominio']);
	trae_tareas($id_dominio);
}elseif ($operacion=="mt") {
	$id_tarea=urldecode($_POST['id_tarea']);
	$peso_tarea=urldecode($_POST['peso_tarea']);
	$id_dominio=urldecode($_POST['id_dominio']);
	$tarea=urldecode($_POST['tarea']);
	$sql="UPDATE dominios_tareas SET Tarea='" . $tarea . "', Peso_Tarea=" . $peso_tarea . " WHERE ID_Tareas=" . $id_tarea;
	if ($mysqli->query($sql) === TRUE){
		trae_tareas($id_dominio);
	}
}elseif ($operacion=="bt") {
	$id_tarea=urldecode($_POST['id_tarea']);
	$id_dominio=urldecode($_POST['id_dominio']);
	$sql="DELETE FROM dominios_tareas WHERE ID_Tareas=" . $id_tarea;
	if ($mysqli->query($sql) === TRUE){
		trae_tareas($id_dominio);
		unlink("./tareas/" . $id_tarea . ".txt");
		$sql="DELETE FROM tareas_usuarios WHERE ID_Tarea=" . $id_tarea;
      	if ($mysqli->query($sql) === TRUE){

		}

	}
}elseif ($operacion=="mtar") {
	$tarea=urldecode($_POST['tarea']);
	$id_tarea=urldecode($_POST['id_tarea']);
	$archivo_tarea = fopen("./tareas/" . $id_tarea . ".txt", "w");
	fwrite($archivo_tarea, $tarea);
	fclose($archivo_tarea);
}elseif ($operacion=="atu") {
	$id_tarea=urldecode($_POST['id_tarea']);
	$id_usuario=urldecode($_POST['id_usuario']);
	$peso=urldecode($_POST['peso']);
	$sql="INSERT INTO tareas_usuarios (ID_Usuario,ID_Tarea,Peso) VALUES (" . $id_usuario . "," . $id_tarea . "," . $peso . ")";
	if ($mysqli->query($sql) === TRUE) $ID = $mysqli->insert_id; //inserto registro y obtengo el AutoID
	$id_tarea_usuario=$ID;

	//$Json=array('ID_Tarea_Usuario' => $ID);
	trae_tareas_usuarios($id_tarea);
}elseif ($operacion=="btu") {
	$id_tarea_usuario=urldecode($_POST['id_tarea_usuario']);
	$id_tarea=urldecode($_POST['id_tarea']);
	$sql="DELETE FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
	if ($mysqli->query($sql) === TRUE){
		trae_tareas_usuarios($id_tarea);
	}
}elseif ($operacion=="ltu") {
	$id_tarea=urldecode($_POST['id_tarea']);
	trae_tareas_usuarios($id_tarea);
}elseif ($operacion=="mtu") {
	$id_tarea_usuario=urldecode($_POST['id_tarea_usuario']);
	$peso=urldecode($_POST['peso']);
	$id_tarea=urldecode($_POST['id_tarea']);
	
	$sql="UPDATE tareas_usuarios SET Peso=" . $peso . " WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
	if ($mysqli->query($sql) === TRUE){
		trae_tareas_usuarios($id_tarea);
	}
}elseif ($operacion=="ctul") {
	$id_usuario=urldecode($_POST['id_usuario']);
	$Json=[];
	$sql="SELECT ID_Tarea_Usuario, ID_Tarea, Peso, Cumplimiento FROM tareas_usuarios WHERE ID_Usuario=" . $id_usuario;
	$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)>0) {
			while ($tareas=$resultado->fetch_assoc()){
      			$id_tarea_usuario= $tareas['ID_Tarea_Usuario'] ;
      			$id_tarea= $tareas['ID_Tarea'] ;
      			$peso= $tareas['Peso'] ;
      			$cumplimiento= $tareas['Cumplimiento'] ;
      			$Json1=array('ID_Tarea_Usuario' => $id_tarea_usuario, 'ID_Tarea' => $id_tarea, 'Tarea' => idTarea2Tarea($id_tarea), 'Cumplimiento' => $cumplimiento, 'Peso' => $peso);
    			array_push($Json, $Json1);
      		}
      	}
      $json=json_encode($Json);
	  echo $json;

}elseif ($operacion=="ctuc") {

	$id_tarea_usuario=urldecode($_POST['id_tarea_usuario']);
	$Json=[];
	$sql="SELECT Cumplimiento FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
	$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)>0) {
			while ($cump=$resultado->fetch_assoc()){
      			$cumplimiento= $cump['Cumplimiento'] ;
      			$Json1=array('Cumplimiento' => $cumplimiento);
    			array_push($Json, $Json1);
      		}
      	}
      $json=json_encode($Json);
	  echo $json;
	
}elseif ($operacion="ctum") {
	$fecha_ahora=date("Y-m-d H:i:s");
	$id_tarea_usuario=urldecode($_POST['id_tarea_usuario']);
	$cumplimiento=urldecode($_POST['cumplimiento']);
	//$sql=("SELECT ID_Tarea FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario)
	$sql="UPDATE dominios_tareas SET Fecha_Actualizacion='" . $fecha_ahora . "' WHERE ID_Tareas=(SELECT ID_Tarea FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario .")";
	if ($mysqli->query($sql) === TRUE){
		
	}

	$sql="UPDATE tareas_usuarios SET Cumplimiento=" . $cumplimiento . " WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
	if ($mysqli->query($sql) === TRUE){
		//trae_tareas_usuarios($id_tarea);
		//cumplimientoTareas($id_tarea_usuario);
		calculaCumplimiento();
		echo("[]");
	}
}


//decrementaCumplimiento();

}

function trae_normativas_general(){
	$cumplimiento_total=calculaCumplimiento();
	$sql="SELECT ID_Normativa_General, Normativa_General, Cumplimiento,Peso FROM normativas_general";
	$Json=[];
	$resultado=$GLOBALS['mysqli']->query($sql);
    	if ($GLOBALS['mysqli']->affected_rows<>0){
    		while ($valores=$resultado->fetch_assoc()){
    			$id_normativa_general= $valores['ID_Normativa_General'];
    			$normativa_general= $valores['Normativa_General'];
    			$cumplimiento= $valores['Cumplimiento'];
    			$peso=$valores['Peso'];
    			$Json1=array('ID_Normativa_General' => $id_normativa_general, 'Normativa_General' => $normativa_general, 'Cumplimiento' => $cumplimiento, 'Peso' => $peso, 'Cumplimiento_Total' => $cumplimiento_total);
    			array_push($Json, $Json1);
	        	
    		}
    	}
		$json=json_encode($Json);
	    echo $json;
}
function trae_dominios($id_normativa_general){
	$cumplimiento_total=calculaCumplimiento();
	if ($id_normativa_general==0){
		$sql="SELECT ID_Dominio,ID_Normativa_General, Dominio, Cumplimiento,Peso FROM normativas_dominios";	
	}else{
		$sql="SELECT ID_Dominio,ID_Normativa_General, Dominio, Cumplimiento,Peso FROM normativas_dominios WHERE ID_Normativa_General=" . $id_normativa_general;
	}
	$Json=[];
	$resultado=$GLOBALS['mysqli']->query($sql);
    	if ($GLOBALS['mysqli']->affected_rows<>0){
    		while ($valores=$resultado->fetch_assoc()){
				$id_dominio= $valores['ID_Dominio'];
    			$id_normativa_general= $valores['ID_Normativa_General'];
    			$dominio= $valores['Dominio'];
    			$cumplimiento= $valores['Cumplimiento'];
    			$peso_dominio=$valores['Peso'];
    			$Json1=array('ID_Dominio'=> $id_dominio, 'ID_Normativa_General' => $id_normativa_general, 'Dominio' => $dominio, 'Cumplimiento' => $cumplimiento, 'Peso_Dominio' => $peso_dominio, 'Cumplimiento_Total' => $cumplimiento_total);
    			array_push($Json, $Json1);
	        	
    		}
    	}
		$json=json_encode($Json);
	    echo $json;
}

function trae_tareas($id_dominio){
	$cumplimiento_total=calculaCumplimiento();
	if($id_dominio==0){
			$sql="SELECT ID_Tareas, Peso_Tarea, Cumplimiento,Tarea,ID_Dominio FROM dominios_tareas";
	}else{
			$sql="SELECT ID_Tareas, Peso_Tarea, Cumplimiento,Tarea,ID_Dominio FROM dominios_tareas WHERE ID_Dominio=" . $id_dominio;
	}

	$Json=[];
	$resultado=$GLOBALS['mysqli']->query($sql);
    	if ($GLOBALS['mysqli']->affected_rows<>0){
    		while ($valores=$resultado->fetch_assoc()){
    			$id_tarea= $valores['ID_Tareas'];
    			$cumplimiento= $valores['Cumplimiento'];
    			$peso=$valores['Peso_Tarea'];
    			$tarea=$valores['Tarea'];
    			$id_dominio=$valores['ID_Dominio'];
    			$Json1=array('ID_Tarea' => $id_tarea, 'Cumplimiento' => $cumplimiento, 'Peso' => $peso, 'Tarea' => $tarea, 'ID_Dominio' => $id_dominio, 'Cumplimiento_Total' => $cumplimiento_total);
    			array_push($Json, $Json1);
	        	
    		}
    	}
		$json=json_encode($Json);
	    echo $json;
}

function trae_tareas_usuarios($id_tarea){
	$cumplimiento_total=calculaCumplimiento();
	if($id_tarea==0){
			$sql="SELECT ID_Tarea_Usuario, ID_Usuario, ID_Tarea, Peso, Cumplimiento FROM tareas_usuarios";
	}else{
			$sql="SELECT ID_Tarea_Usuario, ID_Usuario, ID_Tarea, Peso, Cumplimiento FROM tareas_usuarios WHERE ID_Tarea=" . $id_tarea;
	}
	$Json=[];
	$resultado=$GLOBALS['mysqli']->query($sql);
    	if ($GLOBALS['mysqli']->affected_rows<>0){
    		while ($valores=$resultado->fetch_assoc()){
    			$id_tarea_usuario= $valores['ID_Tarea_Usuario'];
    			$id_usuario= $valores['ID_Usuario'];
    			$id_tarea= $valores['ID_Tarea'];
    			$cumplimiento= $valores['Cumplimiento'];
    			$peso=$valores['Peso'];
    			$Json1=array('ID_Tarea_Usuario' => $id_tarea_usuario, 'ID_Usuario' => $id_usuario, 'ID_Tarea' => $id_tarea, 'Cumplimiento' => $cumplimiento, 'Peso' => $peso, 'Nombre' => id2usuario($id_usuario), 'Cumplimiento_Total' => $cumplimiento_total);
    			array_push($Json, $Json1);
	        	
    		}
    	}
		$json=json_encode($Json);
	    echo $json;
}

function id2usuario($id){
	$sql="SELECT Nombre, Apellido, Usuario FROM usuarios WHERE ID_Usuario=" . $id;
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$apellido= $valores['Apellido'];
			$nombre= $valores['Nombre'];
			$usuario= $valores['Usuario'];
		}
	}
	return $usuario;
}

function idTarea2Tarea($id){
	$sql="SELECT Tarea FROM dominios_tareas WHERE ID_Tareas=" . $id;
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$tarea= $valores['Tarea'];
		}
	}
	return $tarea;
}

function cumplimientoTareas($id_tarea_usuario){
	$sql="SELECT ID_Tarea, Peso, Cumplimiento FROM tareas_usuarios WHERE ID_Tarea_Usuario=" . $id_tarea_usuario;
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$id_tarea= $valores['ID_Tarea'];
			$peso= $valores['Peso'];
			$cumplimiento= $valores['Cumplimiento'];
			$cumplimiento_aporte=($cumplimiento*$peso)/100;
			$cumplimiento_aporte=$cumplimiento_aporte+traeRestoCumplimiento($id_tarea,$id_tarea_usuario);
			$sql="UPDATE dominios_tareas SET Cumplimiento=" . $cumplimiento_aporte . " WHERE ID_Tareas=" . $id_tarea;
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
		}
	}
	return 0;
}

function traeRestoCumplimiento($id_tarea,$id_tarea_usuario){
	$cumplimiento_aporte=0;
	$sql="SELECT Cumplimiento FROM tareas_usuarios WHERE ID_Tarea=" . $id_tarea . " AND ID_Tarea_Usuario<>" . $id_tarea_usuario;
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$cumplimiento= $valores['Cumplimiento'];
			$cumplimiento_aporte+=$cumplimiento;
		}
	}
	return $cumplimiento_aporte;
}

function calculaCumplimiento(){
	$cumplimiento=0;
	$sql="SELECT SUM(Cumplimiento*Peso)/100 AS Cumplimiento1,ID_Tarea FROM `tareas_usuarios` GROUP BY ID_Tarea";
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$cumplimiento= $valores['Cumplimiento1'];
			$id_tarea=$valores['ID_Tarea'];
			$sql="UPDATE dominios_tareas SET Cumplimiento=" . $cumplimiento . " WHERE ID_Tareas=" . $id_tarea;
			//echo($sql);
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
		}
	}
	$cumplimiento=0;
	$sql="SELECT SUM(Cumplimiento*Peso_Tarea)/100 AS Cumplimiento1,ID_Dominio FROM dominios_tareas GROUP BY ID_Dominio";
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$cumplimiento= $valores['Cumplimiento1'];
			$id_dominio=$valores['ID_Dominio'];
			$sql="UPDATE normativas_dominios SET Cumplimiento=" . $cumplimiento . " WHERE ID_Dominio=" . $id_dominio;
			//echo($sql);
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
		}
	}
	$cumplimiento=0;
	$sql="SELECT SUM(Cumplimiento*Peso)/100 AS Cumplimiento1,ID_Normativa_General FROM normativas_dominios GROUP BY ID_Normativa_General";
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$cumplimiento= $valores['Cumplimiento1'];
			$id_normativa_general=$valores['ID_Normativa_General'];
			$sql="UPDATE normativas_general SET Cumplimiento=" . $cumplimiento . " WHERE ID_Normativa_General=" . $id_normativa_general;
			//echo($sql);
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
		}
	}
	$cumplimiento=0;
	$sql="SELECT SUM(Cumplimiento*Peso)/100 AS Cumplimiento_Total FROM normativas_general";
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$cumplimiento=intval($valores['Cumplimiento_Total']);
			
		}
	}

	return $cumplimiento;
}

function decrementaCumplimiento(){
//Quito Cumplimiento a las Tareas que no se actualizaron despues de un tiempo
	$fecha_ahora=date("Y-m-d H:i:s");

	//$fecha_ahora=date();
	$sql="SELECT ID_Tareas FROM dominios_tareas WHERE Fecha_Actualizacion<=DATE_SUB('" . $fecha_ahora . "',INTERVAL 1 DAY)";
	$resultado=$GLOBALS['mysqli']->query($sql);
	if ($GLOBALS['mysqli']->affected_rows<>0){
		while ($valores=$resultado->fetch_assoc()){
			$id_tarea=$valores['ID_Tareas'];
			$sql="UPDATE tareas_usuarios SET Cumplimiento=Cumplimiento-10 WHERE ID_Tarea=" . $id_tarea;
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
			$sql="UPDATE dominios_tareas SET Fecha_Actualizacion='" . $fecha_ahora . "' WHERE ID_Tareas=" . $id_tarea;
			if ($GLOBALS['mysqli']->query($sql) === TRUE){
			}
		}
	}
	$sql="UPDATE dominios_tareas SET Cumplimiento=0 WHERE Cumplimiento<0";
	if ($GLOBALS['mysqli']->query($sql) === TRUE){
	}

}

?>
