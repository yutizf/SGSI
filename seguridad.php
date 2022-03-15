<?php
/*OPERACIONES
lu - Lista Usuarios
bu - Baja de Usuario
mu - Modifica Usuario
li - Logueo de Usuario
vu - Verifica Usuario - Verifica que alguien este logueado
du - Desloguea Usuario
lg - Lista Grupos

*/
//$mysqli = mysqli_connect('localhost', 'xxxxxx', 'xxxxxx', 'sgsi');
//$mysqli = mysqli_connect('mysql.hostinger.com.ar', 'xxxxxx', 'xxxxxx', 'u999182147_base1');
require('configuracion.php');
if ($mysqli->connect_errno) {
   echo "Error al conectarse a la Base de Datos";
}else{
	$sql="SELECT Usuario FROM usuarios";
	$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)==0) {
			//Si la tabla usuarios esta borrada accidentalmente genero un usuario Admin
			$nombre="Admin";
			$apellido="Admin";
			$usuario="admin";
			$password=hash('md5',"admin");
			$email="admin@correo.com";
			$grupo=1;
			$sql="INSERT INTO usuarios (Nombre,Apellido,Usuario,Clave,Correo,Grupo) VALUES ('" . $nombre . "','" . $apellido . "','" . $usuario . "','" . $password . "','" . $email . "'," . $grupo . ")";
			if ($mysqli->query($sql) === TRUE) {}
		}


	$operacion=urldecode($_POST['operacion']);
	$Json=[];
	if($operacion=="au"){
		$nombre=urldecode($_POST['nombre']);
		$apellido=urldecode($_POST['apellido']);
		$usuario=urldecode($_POST['usuario']);
		$password=urldecode($_POST['password']);
		$password=hash('md5', $password);
		$email=urldecode($_POST['email']);
		$grupo=urldecode($_POST['grupo']);
		$sql="INSERT INTO usuarios (Nombre,Apellido,Usuario,Clave,Correo,Grupo) VALUES ('" . $nombre . "','" . $apellido . "','" . $usuario . "','" . $password . "','" . $email . "'," . $grupo . ")";
		//echo $sql;
		if ($mysqli->query($sql) === TRUE) $ID = $mysqli->insert_id; //inserto registro y obtengo el AutoID
		//$Json1=array('ID_Usuario' => $ID, 'Usuario' => $usuario, 'Nombre' => $nombre, 'Apellido' => $apellido, 'Email' => $email);
		//array_push($Json, $Json1);
		trae_usuarios();
	}elseif ($operacion=="lu") {
		trae_usuarios();
	}elseif ($operacion=="bu") {
		$id_usuario=urldecode($_POST['id_usuario']);
		$sql="DELETE FROM tareas_usuarios WHERE ID_Usuario=" . $id_usuario;
		if ($mysqli->query($sql) === TRUE){

		}
		$sql="DELETE FROM usuarios WHERE ID_Usuario=" . $id_usuario;
		if ($mysqli->query($sql) === TRUE){
			trae_usuarios();
		}
	}elseif ($operacion=="mu") {
		$id_usuario=urldecode($_POST['id_usuario']);
		$nombre=urldecode($_POST['nombre']);
		$apellido=urldecode($_POST['apellido']);
		$usuario=urldecode($_POST['usuario']);
		$password=urldecode($_POST['password']);
		$password1=hash('md5', $password);
		$email=urldecode($_POST['email']);
		$grupo=urldecode($_POST['grupo']);
		if($password==""){
			$sql="UPDATE usuarios SET Nombre='" . $nombre . "',Apellido='" . $apellido . "',Usuario='" . $usuario . "',Correo='" . $email . "',Grupo=" . $grupo . " WHERE ID_Usuario=" . $id_usuario;
		}else{
			$sql="UPDATE usuarios SET Nombre='" . $nombre . "',Apellido='" . $apellido . "',Usuario='" . $usuario . "',Clave='" . $password1 . "',Correo='" . $email . "',Grupo=" . $grupo . " WHERE ID_Usuario=" . $id_usuario;
		}
		//echo ($sql);
		if ($mysqli->query($sql) === TRUE) {
			//echo ($sql);
			trae_usuarios();
		}
	}elseif ($operacion=="li") {
		$usuario=urldecode($_POST['usuario']);
		$password=urldecode($_POST['password']);
		$password=hash('md5', $password);
		$id_usuario=0;
		$nombre="";
		$apellido="";	
		$grupo=0;	
		$Json=[];
		$sql="SELECT ID_Usuario, Nombre, Apellido, Grupo FROM usuarios WHERE Usuario='" . $usuario . "' AND Clave='" . $password . "'";
		//echo $sql;
		$resultado=$mysqli->query($sql);
		if (mysqli_num_rows($resultado)>0) {
			while ($usuario_fetch=$resultado->fetch_assoc()){
      			$id_usuario= $usuario_fetch['ID_Usuario'] ;
      			$nombre=$usuario_fetch['Nombre'];
      			session_start();
      			$apellido=$usuario_fetch['Apellido'];
      			$grupo=$usuario_fetch['Grupo'];
      			$_SESSION['id_usuario']=$id_usuario;
      			$_SESSION['nombre']=$nombre;
      			$_SESSION['apellido']=$apellido;
      			$_SESSION['grupo']=$grupo;
      			//$Json1=array('ID_Usuario' => $id_usuario, 'Nombre' => $nombre, 'Apellido' => $apellido);
      			
      		}
		}
		$Json1=array('ID_Usuario' => $id_usuario, 'Nombre' => $nombre, 'Apellido' => $apellido, 'Grupo' => $grupo);
		array_push($Json, $Json1);
		$json=json_encode($Json);
	    echo $json;
	}elseif ($operacion=="vu") {
		$id_usuario=0;
		$nombre="";
		$apellido="";
		$grupo=0;		
		$Json=[];
		session_start();
		if(isset($_SESSION['id_usuario'])){
			$id_usuario=$_SESSION['id_usuario'];
			$nombre=$_SESSION['nombre'];
			$apellido=$_SESSION['apellido'];
			$grupo=$_SESSION['grupo'];
		}
		$Json1=array('ID_Usuario' => $id_usuario, 'Nombre' => $nombre, 'Apellido' => $apellido, 'Grupo' => $grupo);
		array_push($Json, $Json1);
		$json=json_encode($Json);
	    echo $json;
	}elseif ($operacion=="du") {
		session_start();
		session_destroy();
		$id_usuario=0;
		$nombre="";
		$apellido="";		
		$Json=[];
		$Json1=array('ID_Usuario' => $id_usuario, 'Nombre' => $nombre, 'Apellido' => $apellido);
		array_push($Json, $Json1);
		$json=json_encode($Json);
	    echo $json;
	}elseif ($operacion=="lg") {
		$Json=[];
		$Json1=array('Grupo_Nombre' => 'Admin', 'Grupo_Valor' => 1);
		array_push($Json, $Json1);
		$Json1=array('Grupo_Nombre' => 'Supervisor', 'Grupo_Valor' => 2);
		array_push($Json, $Json1);
		$Json1=array('Grupo_Nombre' => 'Tecnico', 'Grupo_Valor' => 3);
		array_push($Json, $Json1);

		$json=json_encode($Json);
		echo $json;
	}

	//$json=json_encode($Json);
	//echo $json;

}

function trae_usuarios(){
	$sql="SELECT ID_Usuario,Nombre,Apellido,Usuario,Clave,Correo,Grupo FROM usuarios ORDER BY Apellido,Nombre";
	$Json=[];
	$resultado=$GLOBALS['mysqli']->query($sql);
    	if ($GLOBALS['mysqli']->affected_rows<>0){
    		while ($valores=$resultado->fetch_assoc()){
    			$id_usuario= $valores['ID_Usuario'];
    			$nombre= $valores['Nombre'];
    			$apellido= $valores['Apellido'];
    			$usuario=$valores['Usuario'];
    			$password=$valores['Clave'];
    			$email=$valores['Correo'];
    			$grupo=$valores['Grupo'];
    			$Json1=array('ID_Usuario' => $id_usuario, 'Nombre' => $nombre, 'Apellido' => $apellido, 'Usuario' => $usuario, 'Password' => $password, 'Email' => $email, 'Grupo' => $grupo);
    			array_push($Json, $Json1);
	        	
    		}
    	}
		$json=json_encode($Json);
	    echo $json;
}

?>