<!DOCTYPE html>
<html>
<head>
	<title>Sistema de Gestion de la Seguridad de la Informacion</title>
	<link rel="stylesheet" type="text/css" href="estilos.css" id="estilos">
	<script type="text/javascript" src="jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="Chart.js"></script>
	<script type="text/javascript" src="dashboard.js"></script>
	<script type="text/javascript" src="index.js"></script>
</head>
<body>
	<div class="principal" id="principal">
		<h1>Sistema de Gestión de la Seguridad de la Información</h1>
	</div>
	<div class="menu" id="menu">
		<table id="tabla_menu">
			<tr>
				<td><a href="#" id="dashboard">Dashboard</td>
				<td id="texto_menu" rowspan="10">Menú</td>
			</tr>
			<tr>
				<td><a href="#" id="listado_normativas">ABM Listado Normativas</a></td>
				
			</tr>
			<tr>
				<td><a href="#" id="abm_normativas">ABM Dominios Normativas</a></td>
			</tr>
			<tr>
				<td><a href="#" id="abm_documentacion">ABM Documentacion</a></td>
			</tr>
			<tr>
				<td><a href="#" id="abm_tareas">ABM Tareas</td>
			</tr>
			<tr>
				<td><a href="#" id="abm_tareas_descripcion">ABM Descripcion de Tareas</a></td>
			</tr>
			<tr>
				<td><a href="#" id="abm_usuarios">ABM Usuarios</td>
			</tr>
			<tr>
				<td><a href="#" id="abm_tareas_usuarios">ABM Tareas a Usuarios</td>
			</tr>
			<tr>
				<td><a href="#" id="mnu_completar_tareas">Completar Tareas</td>
			</tr>
			<tr>
				<td><a href="#" id="salir">Logout</td>
			</tr>
		</table>
	</div>
	<div class="agregar">
		<form id="formulario">
			<fieldset>
				<legend>AMB Listado de Normativas</legend>
				<label id="lbl_cumplimiento_total">Cumplimiento Total 0%</label><br>
				<input type="text" id="normativa" name="normativa" maxlength="50" placeholder="Ingrese Normativa">
				<input type="range" id="peso" name="peso" min=0 max=100 list="tickmarks" step="5"><label id="lbl_peso"></label>
				<input type="button" id="btn_aceptar" name="btn_aceptar" value="Agregar">
				<label id="status">status</label>
				
			</fieldset>
		</form>
		<table id=tabla_normativas>
			<tr>
				<td>ID</td>
				<td>Normativa</td>
				<td>Cumplimiento</td>
				<td>Peso</td>
				<td>Eliminar</td>
			</tr>
		</table>
		
	</div>
	<div class="dominio_normativas">
		<form id="formulario_dominio_normativas">
			<fieldset>
				<legend>AMB Dominios de Normativas</legend>
				<select id="select_normativas"></select>
				<input type="text" id="dominio_normativa" name="dominio_normativa" maxlength="50" placeholder="Ingrese Dominio">
				<input type="range" id="peso_dominio" name="peso_dominio" min=0 max=100 list="tickmarks" step="5"><label id="lbl_peso_dominio"></label>
				<input type="button" id="btn_dominio_aceptar" name="btn_dominio_aceptar" value="Agregar">
				<label id="status_dominios">status</label>
			</fieldset>
		</form>
		<table id=tabla_dominio_normativas>
			<tr>
				<td>ID</td>
				<td>Normativa</td>
				<td>Dominio</td>
				<td>Cumplimiento</td>
				<td>Eliminar</td>
			</tr>
		</table>
		
	</div>
	<div class="normativas">
		<form id="formulario_normativas">
			<fieldset>
				<legend>ABM de Normativas</legend>
				<select id="select_normativas1"></select>
				<select id="select_documentacion"></select>
			</fieldset>
		</form>
		<iframe src="about:blank" id="iframe_normativa"></iframe>
	</div>
	<div class="tareas">
		<form id="formulario_tareas">
			<fieldset>
				<legend>ABM de Tareas</legend>
				<select id="select_normativas_tareas"></select>
				<select id="select_documentacion_tareas"></select>
				<input type="text" name="dominio_tarea" id="dominio_tarea" maxlength="100" placeholder="Describa la Tarea">
				<input type="range" id="peso_tarea" name="peso_tarea" min=0 max=100 list="tickmarks" step="5"><label id="lbl_peso_tarea"></label>
				<input type="button" id="btn_tarea_aceptar" name="btn_tarea_aceptar" value="Agregar">
				<label id="status_tareas">status</label>
			</fieldset>
		</form>
		<table id="tabla_tareas">
			<tr>
				<td>ID</td>
				<td>ID_Dominio</td>
				<td>Tarea</td>
				<td>Peso_Tarea</td>
				<td>Cumplimiento</td>
			</tr>
		</table>
	</div>
	<div class="tareas_descripcion">
		<form id="formulario_tareas_descripcion">
			<fieldset>
				<legend>ABM de Descripcion de Tareas</legend>
				<select id="select_normativas_tareas_descripcion"></select>
				<select id="select_documentacion_tareas_descripcion"></select>
				<select id="select_tareas"></select>
			</fieldset>
		</form>
		<iframe src="about:blank" id="iframe_tareas"></iframe>
	</div>
	<div class="usuarios">
		<form id="formulario_usuarios">
			<fieldset>
				<legend>ABM de Usuarios</legend>
				<input type="text" name="nombre" id="nombre" maxlength="100" placeholder="Nombre">
				<input type="text" name="apellido" id="apellido" maxlength="100" placeholder="Apellido">
				<input type="text" name="usuario" id="usuario" maxlength="30" placeholder="Usuario">
				<input type="password" name="password" id="password" maxlength="50" placeholder="Contraseña">
				<input type="email" name="email" id="email" maxlength="50" placeholder="Email">
				<select id="select_grupos"></select>
				<input type="button" name="btn_agregar_usuario" id="btn_agregar_usuario" value="Agregar">
			</fieldset>
		</form>
		<table id="tabla_usuarios">
			<tr>
				<td>ID</td>
				<td>Nombre</td>
				<td>Apellido</td>
				<td>Usuario</td>
				<td>Contraseña</td>
				<td>Correo Electronico</td>
				<td>Grupo</td>
			</tr>
		</table>
	</div>
	<div class="login">
		<form id="form_login" autocomplete="off">
			<fieldset>
				<legend>Ingreso de Usuarios</legend>
				<input type="text" name="login_usuario" id="login_usuario" placeholder="Usuario"><br>
				<input type="password" name="login_password" id="login_password" placeholder="Password"><br>
				<label id="login_status" visible=false></label><br>
				<input type="button" name="btn_login" id="btn_login" value="Ingresar">
			</fieldset>
		</form>
	</div>
	<div class="tareas_usuarios">
		<form id="formulario_tareas_usuarios">
			<fieldset>
				<legend>ABM de Tareas a Usuarios</legend>
				<select id="select_normativas_tareas_usuarios"></select>
				<select id="select_dominios_tareas_usuarios"></select>
				<select id="select_tareas_tareas_usuarios"></select>
				<select id="select_usuarios_tareas_usuarios"></select>
				<input type="range" id="peso_tarea_usuario" name="peso_tarea_usuario" min=0 max=100 list="tickmarks" step="5"><label id="lbl_peso_tarea_usuario"></label>
				<input type="button" id="btn_tarea_usuario_aceptar" name="btn_tarea_aceptar" value="Agregar">
				<label id="status_tareas_usuarios">status</label>
			</fieldset>
		</form>
		<table id="tabla_tareas_usuarios">
			<tr>
				<td>ID</td>
				<td>Tarea</td>
				<td>Usuario</td>
				<td>Peso_Tarea</td>
				<td>Cumplimiento</td>
			</tr>
		</table>
	</div>
	<div class="completar_tareas">
		<form id="formulario_completar_tareas">
			<fieldset>
				<legend>Completar Tareas</legend>
				<select id="select_completar_usuario_tareas"></select>
				<input type="range" id="completar_tarea_cumplimiento" name="completar_tarea_cumplimiento" min=0 max=100 list="tickmarks" step="5"><label id="lbl_completar_tarea_cumplimiento"></label>
				<input type="button" id="btn_completar_modificar" name="btn_completar_modificar" value="Modificar">
			</fieldset>
			
		</form>
		<iframe src="about:blank" id="iframe_completar_tareas"></iframe>
	</div>
	<div class="procesando">
		<img src="loading.gif" width="50" height="50">
	</div>
<!--
	<div class="dashboard">
		<canvas id="chartNormativas" width="400" height="400">algo</canvas>
		<canvas id="chartNormativasRadar" width="400" height="400">algo</canvas>
	</div>
-->
<datalist id="tickmarks">
	  <option value="0" label="0%">
	  <option value="10">
	  <option value="20">
	  <option value="30">
	  <option value="40">
	  <option value="50" label="50%">
	  <option value="60">
	  <option value="70">
	  <option value="80">
	  <option value="90">
	  <option value="100" label="100%">
</datalist>
</body>
</html>
