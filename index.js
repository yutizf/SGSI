var cancelo;
var select_dominio_seleccionado;
var ID_Normativa_General_Global;
var Peso_Anterior;
var ID_Usuario_Logueado=0;
var Apellido_Logueado="";
var Nombre_Logueado="";
var Grupo_Logueado=0;
var Grupos;
$(document).ready(function(){
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
  //lt - Listado de Tareas
  //mt - Modificacion de Tareas
  //bt - Baja de Tarea

  //ctul - Lista las tareas de un usuario particular - Llena Select select_completar_usuario_tareas
  //lg - Lista Grupos

  //ALTA DE NORMATIVA
	$("#btn_aceptar").click(function(){
		normativa=document.getElementById("normativa");
    var peso=document.getElementById("peso");
    if (!document.getElementById("normativa").value==""){
		  enviar("a",normativa.value,peso.value); 
      document.getElementById("normativa").style.borderColor = "black";
    }else{
      document.getElementById("normativa").style.borderColor = "red";
    }
	});

   //ALTA DE DOMINIO
  $("#btn_dominio_aceptar").click(function(){
    var dominio=normativa=document.getElementById("dominio_normativa");
    var id_normativa_general=document.getElementById("select_normativas");
    var peso_dominio=document.getElementById("peso_dominio");
    //console.log(dominio_normativa.value + " : " + id_normativa_general.value);
    enviar("ad",id_normativa_general.value,dominio_normativa.value,peso_dominio.value); 
  });

  //ALTA DE TAREA
  $("#btn_tarea_aceptar").click(function(){
    var id_dominio=document.getElementById("select_documentacion_tareas");
    var peso_tarea=document.getElementById("peso_tarea");
    var dominio_tarea=document.getElementById("dominio_tarea");
    //console.log(id_dominio+" - "+peso_tarea);
    enviar("at",id_dominio.value,peso_tarea.value,dominio_tarea.value);
    enviar("lt",id_dominio.value);
  });

  //Trae listado de normativas pero deja solo visible el menu
	$(".agregar").hide();
	//enviar("l",""); // para listar
  $(".dominio_normativas").hide();
  $(".normativas").hide();
  $(".tareas").hide();
  $(".tareas_descripcion").hide();
  $(".usuarios").hide();
  $(".login").hide();
  $(".tareas_usuarios").hide();
  $(".completar_tareas").hide();
  $(".procesando").hide();
  $(".dashboard").hide();
  seguridad("vu"); //Verifico si alguien esta logueado
  seguridad("lg");


  //Click en el menu de ABM Listado de Normativas Generales
  
	 $("#listado_normativas").click(function(){
		  $(".agregar").show();
      $(".dominio_normativas").hide();
      $(".normativas").hide();
      $(".tareas").hide();
      $(".tareas_descripcion").hide();
      $(".usuarios").hide();
      $(".tareas_usuarios").hide();
      $(".completar_tareas").hide();
      $(".procesando").hide();
      $(".dashboard").hide();
      $("canvas").remove();
     enviar("l",""); // para listar
	 });

  //Click en el menu de ABM Dominio Normativas
    $("#abm_normativas").click(function(){
      $("canvas").remove();
      $(".agregar").hide();
      $(".normativas").hide();
      $(".dominio_normativas").show();
      $(".tareas").hide();
      $(".tareas_descripcion").hide();
      $(".usuarios").hide();
      $(".tareas_usuarios").hide();
      $(".completar_tareas").hide();
      $(".procesando").hide();
      $(".dashboard").hide();
      
      select_normativas_general_completo=false;
      enviar("ln"); //Lleno el Select con Normativas General

    //enviar("ld",1); //Listar 
    });

  //Ciick en el Select de Dominios
  var select_normativas=document.getElementById("select_normativas");
  select_normativas.addEventListener("change",function(){
    //console.log(this.value);
    select_dominio_seleccionado=this.value;
    enviar("ld",select_dominio_seleccionado);
  });
	
  //Click en el Menu de Documentacion
    $("#abm_documentacion").click(function(){
          $(".agregar").hide();
          $(".normativas").show();
          $(".dominio_normativas").hide();
          $(".tareas").hide();
          $(".tareas_descripcion").hide();
          $(".usuarios").hide();
          $(".tareas_usuarios").hide();
          $(".completar_tareas").hide();
          $(".procesando").hide();
          $(".dashboard").hide();
          $("canvas").remove();
          enviar("ln");
          enviar("ld",1);
    });

  //Click en el Menu de Tareas
    $("#abm_tareas").click(function(){
          $(".agregar").hide();
          $(".normativas").hide();
          $(".dominio_normativas").hide();
          $(".tareas").show();
          $(".tareas_descripcion").hide();
          $(".usuarios").hide();
          $(".tareas_usuarios").hide();
          $(".completar_tareas").hide();
          $(".procesando").hide();
          $(".dashboard").hide();
          $("canvas").remove();
          enviar("ln");
          var id_dominio=document.getElementById("select_documentacion_tareas");
        //console.log(id_dominio.value);
        //enviar("lt",id_dominio.value);
    });

  //Click en el Menu de Descripcion de Tareas
    $("#abm_tareas_descripcion").click(function(){
          $(".agregar").hide();
         $(".normativas").hide();
         $(".dominio_normativas").hide();
         $(".tareas").hide();
         $(".tareas_descripcion").show();
         $(".usuarios").hide();
         $(".tareas_usuarios").hide();
         $(".completar_tareas").hide();
         $(".procesando").hide();
         $(".dashboard").hide();
         $("canvas").remove();
          enviar("ln");
          var id_dominio=document.getElementById("select_documentacion_tareas");
        //console.log(id_dominio.value);
        //enviar("lt",id_dominio.value);
    });

   //Click en el Menu de ABM de Usuarios
    $("#abm_usuarios").click(function(){
        $(".agregar").hide();
        $(".normativas").hide();
        $(".dominio_normativas").hide();
        $(".tareas").hide();
        $(".tareas_descripcion").hide();   
        $(".usuarios").show();  
        $(".tareas_usuarios").hide();   
        $(".completar_tareas").hide();
        $(".procesando").hide();
        $(".dashboard").hide();
        $("canvas").remove();
        seguridad("lu");

    });

  //Click en el Menu de ABM de Tareas a Usuarios
    $("#abm_tareas_usuarios").click(function(){
        $(".agregar").hide();
        $(".normativas").hide();
        $(".dominio_normativas").hide();
        $(".tareas").hide();
        $(".tareas_descripcion").hide();   
        $(".usuarios").hide();  
        $(".tareas_usuarios").show(); 
        $(".completar_tareas").hide();
        $(".procesando").hide();
        $(".dashboard").hide();
        $("canvas").remove();
        enviar("ln");
    });

   //Click en el Menu de Completar Tareas
  $("#mnu_completar_tareas").click(function(){
        $(".agregar").hide();
        $(".normativas").hide();
        $(".dominio_normativas").hide();
        $(".tareas").hide();
        $(".tareas_descripcion").hide();   
        $(".usuarios").hide();  
        $(".tareas_usuarios").hide(); 
        $(".completar_tareas").show();
        $(".procesando").hide();
        $(".dashboard").hide();
        $("canvas").remove();
        enviar("ctul",ID_Usuario_Logueado); // Llena Select select_completar_usuario_tareas
  });

  //Click en el Menu de Dashboard
  $("#dashboard").click(function(){
        $(".agregar").hide();
        $(".normativas").hide();
        $(".dominio_normativas").hide();
        $(".tareas").hide();
        $(".tareas_descripcion").hide();   
        $(".usuarios").hide();  
        $(".tareas_usuarios").hide(); 
        $(".completar_tareas").hide();
        $(".procesando").hide();
        $(".dashboard").show();
        $("canvas").remove();
        armaDashboard();
  });

  //Click en el Menu de Salir
  $("#salir").click(function(){
    seguridad("du");
  });
  

   //Click en el Select de Documentacion
    var select_documentacion=document.getElementById("select_documentacion");
    var iframe_normativa=document.getElementById("iframe_normativa");
    select_documentacion.addEventListener("change",function(){
          select_documentacion_seleccionado=this.value;
          //console.log("Ok");
          //iframe_normativa.src="./dominios/" + select_documentacion_seleccionado + ".txt";
          iframe_normativa.src="documentacion.php?id_dominio=" + select_documentacion_seleccionado;
    });
    

  //Click en el Select de Dominios en ABM de Documentacion
    var select_normativas1=document.getElementById("select_normativas1");
    
    select_normativas1.addEventListener("change",function(){
      select_dominio_seleccionado=this.value;
      enviar("ld",select_dominio_seleccionado);
      //console.log("change normativas1");
  });


   //Click en el Select de Dominios en ABM de Tareas
    var select_normativas_tareas=document.getElementById("select_normativas_tareas");
    
    select_normativas_tareas.addEventListener("change",function(){
      select_dominio_seleccionado=this.value;
      enviar("ld",select_dominio_seleccionado);
      //console.log("change normativas1");
  });

  //Click en el Select de Documentacion en ABM de Tareas
    var select_documentacion_tareas=document.getElementById("select_documentacion_tareas");

    select_documentacion_tareas.addEventListener("change",function(){
        enviar("lt",this.value);
    });

//Click en el Select de Dominios en ABM de Descripcion de Tareas
    var select_normativas_tareas_descripcion=document.getElementById("select_normativas_tareas_descripcion");
    
    select_normativas_tareas_descripcion.addEventListener("change",function(){
      select_documentacion_tareas_descripcion=this.value;
      enviar("ld",select_documentacion_tareas_descripcion);
      //console.log("change normativas1");
  });

//Click en el Select de Documentacion en ABM de Descripcion de Tareas
    var select_documentacion_tareas_descripcion=document.getElementById("select_documentacion_tareas_descripcion");

    select_documentacion_tareas_descripcion.addEventListener("change",function(){
        //select_tareas.selectedIndex=0;
        enviar("lt",this.value);
        //iframe_tareas.src="tareas.php?id_tareas=" + select_tareas.value;
    });

//Click en el Select de Tareas en AMB de Descripcion de Tareas
    var select_tareas=document.getElementById("select_tareas");
    select_tareas.addEventListener("change",function(){
        iframe_tareas.src="tareas.php?id_tareas=" + this.value;
    });



//Click en el Boton de agregar Usuario
    var agregar_usuario=document.getElementById("btn_agregar_usuario");
    agregar_usuario.addEventListener("click",function(){
        var nombre=document.getElementById("nombre").value;
        var apellido=document.getElementById("apellido").value;
        var usuario=document.getElementById("usuario").value;
        var password=document.getElementById("password").value;
        var email=document.getElementById("email").value;
        var grupo=document.getElementById("select_grupos").value;
        
        seguridad("au",nombre,apellido,usuario,password,email,grupo);

    });
   
//Click en el Select de Normativas en ABM de Tareas a Usuarios
    var select_normativas_tareas_usuarios=document.getElementById("select_normativas_tareas_usuarios");
    
    select_normativas_tareas_usuarios.addEventListener("change",function(){
      select_normativas_tareas_usuarios=this.value;
      enviar("ld",select_normativas_tareas_usuarios);
      //console.log("change normativas1");
  });

//Click en el Select de Dominios en ABM de Tareas a Usuarios
    var select_dominios_tareas_usuarios=document.getElementById("select_dominios_tareas_usuarios");
    
    select_dominios_tareas_usuarios.addEventListener("change",function(){
      select_dominios_tareas_usuarios=this.value;
      enviar("lt",select_dominios_tareas_usuarios);
      //console.log("change normativas1");
  });

//Click en el Boton de agregar Tarea a Usuario
    var agregar_tarea_usuario=document.getElementById("btn_tarea_usuario_aceptar");
    agregar_tarea_usuario.addEventListener("click",function(){
        var select_tareas_tareas_usuarios=document.getElementById("select_tareas_tareas_usuarios").value;
        var select_usuarios_tareas_usuarios=document.getElementById("select_usuarios_tareas_usuarios").value;
        var peso_tarea_usuario=document.getElementById("peso_tarea_usuario").value;
        console.log(select_tareas_tareas_usuarios+" : "+select_usuarios_tareas_usuarios);
        enviar("atu",select_tareas_tareas_usuarios,select_usuarios_tareas_usuarios,peso_tarea_usuario);
    });

//Click en el Select de Tareas en ABM de Tareas a Usuarios
    var select_tareas_tareas_usuarios=document.getElementById("select_tareas_tareas_usuarios");
    select_tareas_tareas_usuarios.addEventListener("change",function(){
        select_tareas_tareas_usuarios=this.value;
        enviar("ltu",select_tareas_tareas_usuarios);
    });

//Click en el Select de Completar Tareas para traer el cumplimiento
    var select_completar_usuario_tareas=document.getElementById("select_completar_usuario_tareas");
    select_completar_usuario_tareas.addEventListener("change",function(){
        select_completar_usuario_tareas=this.value;
        iframe_completar_tareas.src="tareas_usuarios.php?id_tarea_usuario=" + this.value;
        enviar("ctuc",select_completar_usuario_tareas);
    });

//Click en el boton de modificar en Completar Tareas
    var btn_completar_modificar=document.getElementById("btn_completar_modificar");
    btn_completar_modificar.addEventListener("click",function(){
        var completar_tarea_cumplimiento=document.getElementById("completar_tarea_cumplimiento").value;
        var select_completar_usuario_tareas=document.getElementById("select_completar_usuario_tareas").value;
        //console.log(completar_tarea_cumplimiento+" : "+select_completar_usuario_tareas);
        enviar("ctum",select_completar_usuario_tareas,completar_tarea_cumplimiento);
    });

});




function seguridad(operacion,valor,valor2,valor3,valor4,valor5,valor6,valor7){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              //console.log(operacion);
              var json=JSON.parse(this.responseText);
              if(operacion=="au" || operacion=="lu" || operacion=="bu" || operacion=="mu"){
                llenarTablaUsuarios(json);
                llenarSelectUsuarios(json);
              }
              if(operacion=="vu"){
                usuarioLogueado(json);
              }
              if(operacion=="li"){
                usuarioYaLogueado(json);
              }
              if(operacion=="du"){
                location.reload();
              }
              if(operacion=="lg"){
                Grupos=json;
                //console.log(Grupos);
              }
              $(".procesando").hide();
            }

          };

          $(".procesando").show();
          xhttp.open("POST", "seguridad.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          if(operacion=="au"){
            xhttp.send("operacion=au&nombre="+valor+"&apellido="+valor2+"&usuario="+valor3+"&password="+valor4+"&email="+valor5+"&grupo="+valor6);
          }
          if(operacion=="lu"){
            xhttp.send("operacion=lu");
          }
          if(operacion=="bu"){
            xhttp.send("operacion=bu&id_usuario="+valor);
          }
          if(operacion=="mu"){
            xhttp.send("operacion=mu&nombre="+valor+"&apellido="+valor2+"&usuario="+valor3+"&password="+valor4+"&email="+valor5+"&id_usuario="+valor6+"&grupo="+valor7);
          }
          if(operacion=="li"){
            xhttp.send("operacion=li&usuario="+valor+"&password="+valor2);
          }
          if(operacion=="vu"){
            xhttp.send("operacion=vu");
          }
          if(operacion=="du"){
            xhttp.send("operacion=du");
          }
          if(operacion=="lg"){
            xhttp.send("operacion=lg");
          }
}

function enviar(operacion,valor,valor2,valor3,valor4) {
  				var xhttp = new XMLHttpRequest();
  				xhttp.onreadystatechange = function() {
    				if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
    					var json=JSON.parse(this.responseText);
    					//console.log(json);
              if(operacion=="a" || operacion=="l" || operacion=="b" || operacion=="m"){
     					  llenarTabla(json);
              }
              if(operacion=="ln"){
                llenarSelect(json);
              }
              if(operacion=="ld" || operacion=="bd" || operacion=="ad" || operacion=="md"){
                llenarTablaDominios(json);
                llenarSelectDominios(json);
              }
              if(operacion=="lt" || operacion=="mt" || operacion=="bt" || operacion=="at"){
                //llenarSelectDominios(json); //VER
                llenarSelectTareas(json);
                llenarTablatareas(json);
              }
              if(operacion=="atu" || operacion=="ltu" || operacion=="btu" || operacion=="mtu"){
                llenarTablaTareasUsuarios(json);
              }
              if(operacion=="ctul"){
                llenarSelectCompletaTareaUsuario(json);
              }
              if(operacion=="ctuc"){
                llenarCompletatareaUsuarioCumplimiento(json);
              }
              $(".procesando").hide();
    				}
  				};
      $(".procesando").show();
  		xhttp.open("POST", "n_general.php", true);
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		if(operacion=="a"){
  			xhttp.send("operacion=a&normativa_general="+valor+"&peso="+valor2);
  		}
  		if(operacion=="l"){
  			xhttp.send("operacion=l");
  		}
  		if(operacion=="b"){
  			xhttp.send("operacion=b&id_normativa_general="+valor);
  		}
  		if(operacion=="m"){
  			xhttp.send("operacion=m&id_normativa_general="+valor+"&normativa_general="+valor2+"&peso="+valor3);
  		}
      if(operacion=="ln"){
        xhttp.send("operacion=ln");
      }
      if(operacion=="ad"){
        xhttp.send("operacion=ad&id_normativa_general="+valor+"&dominio="+valor2+"&peso_dominio="+valor3);
      }
      if(operacion=="ld"){
        xhttp.send("operacion=ld&id_normativa_general="+valor);
      }
      if(operacion=="bd"){
        xhttp.send("operacion=bd&id_dominio="+valor+"&id_normativa_general="+ID_Normativa_General_Global);
      }
      if(operacion=="md"){
        xhttp.send("operacion=md&id_dominio="+valor+"&dominio="+valor2+"&id_normativa_general="+select_dominio_seleccionado+"&peso="+valor3);
      }
      if(operacion=="lt"){
        xhttp.send("operacion=lt&id_dominio="+valor);
      }
      if(operacion=="at"){
        xhttp.send("operacion=at&id_dominio="+valor+"&peso="+valor2+"&tarea="+valor3);
      }
      if(operacion=="mt"){
        xhttp.send("operacion=mt&id_tarea="+valor+"&id_dominio="+valor2+"&tarea="+valor3+"&peso_tarea="+valor4);
      }
      if(operacion=="bt"){
        xhttp.send("operacion=bt&id_tarea="+valor+"&id_dominio="+valor2);
      }
      if(operacion=="ltu"){
        xhttp.send("operacion=ltu&id_tarea="+valor);
      }
      if(operacion=="atu"){
        xhttp.send("operacion=atu&id_tarea="+valor+"&id_usuario="+valor2+"&peso="+valor3);
      }
      if(operacion=="btu"){
        xhttp.send("operacion=btu&id_tarea_usuario="+valor+"&id_tarea="+valor2);
      }
      if(operacion=="mtu"){
        xhttp.send("operacion=mtu&id_tarea_usuario="+valor+"&peso="+valor2+"&id_tarea="+valor3);
      }
      if(operacion=="ctul"){
        xhttp.send("operacion=ctul&id_usuario="+valor);
      }
      if(operacion=="ctuc"){
        xhttp.send("operacion=ctuc&id_tarea_usuario="+valor);
      }
      if(operacion=="ctum"){
        xhttp.send("operacion=ctum&id_tarea_usuario="+valor+"&cumplimiento="+valor2);
      }
}

function usuarioLogueado(json_tabla){
  console.log(json_tabla);
  json_tabla.forEach(function(item){
      if(item.ID_Usuario==0){
        fadeOut();
        $(".login").show();

        $("#btn_login").click(function(){
            var usuario=document.getElementById("login_usuario").value;
            var password=document.getElementById("login_password").value;
            seguridad("li",usuario,password);
        });
      }else{
        //Usuario Logueado
        ID_Usuario_Logueado=item.ID_Usuario;
        Nombre_Logueado=item.Nombre;
        Apellido_Logueado=item.Apellido;
        Grupo_Logueado=item.Grupo;
        
        $(".login").hide();
        if(Grupo_Logueado==1){
          
        }
        if(Grupo_Logueado==2){
          $("#listado_normativas").off('click');
          $("#listado_normativas").removeAttr('href');

          $("#abm_normativas").off('click');
          $("#abm_normativas").removeAttr('href');

          $("#abm_documentacion").off('click');
          $("#abm_documentacion").removeAttr('href');

          $("#abm_usuarios").off('click');
          $("#abm_usuarios").removeAttr('href');
        }
        if(Grupo_Logueado==3){
          $("#listado_normativas").off('click');
          $("#listado_normativas").removeAttr('href');

          $("#abm_normativas").off('click');
          $("#abm_normativas").removeAttr('href');

          $("#abm_documentacion").off('click');
          $("#abm_documentacion").removeAttr('href');

          $("#abm_tareas").off('click');
          $("#abm_tareas").removeAttr('href');

          $("#abm_tareas_descripcion").off('click');
          $("#abm_tareas_descripcion").removeAttr('href');

          $("#abm_usuarios").off('click');
          $("#abm_usuarios").removeAttr('href');

          $("#abm_tareas_usuarios").off('click');
          $("#abm_tareas_usuarios").removeAttr('href');
        }
        //fadeIn();
        
      }
  });
}
function usuarioYaLogueado(json_tabla){
  json_tabla.forEach(function(item){
      if(!item.ID_Usuario==0){
        location.reload();
      }else{
        //Login erroneo
        var status=document.getElementById("login_status")
        status.innerHTML="Ingreso Invalido"
        var usuario=document.getElementById("login_usuario");
        var password=document.getElementById("login_password");
        usuario.addEventListener("click",function(){
            status.innerHTML="";
        });
        password.addEventListener("click",function(){
            status.innerHTML="";
        });
      }
  });
}


function fadeOut(){
  var principal=document.getElementById("principal");
  principal.style.opacity="0.5";
  var menu=document.getElementById("menu");
  menu.style.opacity="0.0";
  menu.style.left="-200px";
}
function fadeIn(){
  var principal=document.getElementById("principal");
  principal.style.opacity="1";
  var menu=document.getElementById("menu");
  menu.style.opacity="1";
  menu.setAttribute('href', "estilos.css");
  
}

function id2grupo(id){
  var retorno="Desconocido";
  Grupos.forEach(function(item){
  if(item.Grupo_Valor==id){
      retorno=item.Grupo_Nombre;
    }
  });
  return retorno;
}
function grupo2id(grupo){
  var retorno=0;
  Grupos.forEach(function(item){
  if(item.Grupo_Nombre==grupo){
      retorno=item.Grupo_Valor;
    }
  });
  return retorno;
}
function llenarSelectGrupos(elSelect){
  $("#"+elSelect).empty();
  var select_grupos=document.getElementById(elSelect);
  Grupos.forEach(function(item){
    var opt=document.createElement("option");
    opt.innerText=item.Grupo_Nombre;
    opt.value=item.Grupo_Valor;
    select_grupos.appendChild(opt);
  });
}

function llenarTablaUsuarios(json_tabla){
  llenarSelectGrupos("select_grupos");

  //console.log(json_tabla);
  var tabla_usuarios=document.getElementById("tabla_usuarios");
  $("#tabla_usuarios").empty();

  //armo cabecera
  var fila=tabla_usuarios.insertRow();
    var celdaID = fila.insertCell(0);
    celdaID.style.display="none";
    var celdaNombre = fila.insertCell(1);
    var celdaApellido = fila.insertCell(2);
    var celdaUsuario=fila.insertCell(3);
    var celdaPassword = fila.insertCell(4);
    var celdaEmail = fila.insertCell(5);
    var celdaGrupo=fila.insertCell(6)
    var celdaEditar = fila.insertCell(7);
    var celdaEliminar = fila.insertCell(8);
    celdaID.innerHTML ="ID";
    celdaNombre.innerHTML = "<strong>Nombre</strong>";
    celdaApellido.innerHTML = "<strong>Apellido</strong>";
    celdaUsuario.innerHTML = "<strong>Usuario</strong>";
    celdaPassword.innerHTML="<strong>Password</strong>";
    celdaEmail.innerHTML="<strong>Email</strong>";
    celdaGrupo.innerHTML="<strong>Grupo</strong>";
    celdaEditar.innerHTML="<strong>Editar</strong>";
    celdaEliminar.innerHTML="<strong>Eliminar</strong>";
    json_tabla.forEach(function(item){
      
      var fila=tabla_usuarios.insertRow();
      var celdaID = fila.insertCell(0);
      celdaID.style.display="none";
      var celdaNombre = fila.insertCell(1);
      var celdaApellido = fila.insertCell(2);
      var celdaUsuario=fila.insertCell(3);
      var celdaPassword = fila.insertCell(4);
      var celdaEmail = fila.insertCell(5);
      var celdaGrupo = fila.insertCell(6);
      var celdaEditar = fila.insertCell(7);
      var celdaEliminar = fila.insertCell(8);
      celdaID.innerHTML =item.ID_Usuario;
      celdaNombre.innerHTML = item.Nombre;
      celdaApellido.innerHTML = item.Apellido;
      celdaPassword.innerHTML = "********";
      celdaEmail.innerHTML = item.Email;
      celdaGrupo.innerHTML =id2grupo(item.Grupo);
      celdaUsuario.innerHTML = item.Usuario;
      celdaEditar.innerHTML="<a href='#'><img src='imagenes/editar.png'></img></a>";
      celdaEditar.addEventListener("click",function(){
        celdaNombre.innerHTML="<input type´='text' id='N_"+item.ID_Usuario+"' value='"+item.Nombre+"' maxlength='50' style='width: 90%;'>";
        celdaApellido.innerHTML="<input type´='text' id='A_"+item.ID_Usuario+"' value='"+item.Apellido+"' maxlength='50' style='width: 90%;'>";
        celdaUsuario.innerHTML="<input type´='text' id='U_"+item.ID_Usuario+"' value='"+item.Usuario+"' maxlength='50' style='width: 90%;'>";
        celdaPassword.innerHTML="<input type´='password' id='P_"+item.ID_Usuario+"' value='' maxlength='50' style='width: 90%;'>";
        celdaEmail.innerHTML="<input type´='text' id='E_"+item.ID_Usuario+"' value='"+item.Email+"' maxlength='50' style='width: 90%;'>";
        celdaGrupo.innerHTML="<select id=G_"+item.ID_Usuario+"></select>";
        llenarSelectGrupos("G_"+item.ID_Usuario);
        document.getElementById("G_"+item.ID_Usuario).value=item.Grupo;
      });
      celdaEliminar.innerHTML="<a href='#'><img src='imagenes/borrar.png'></img></a>";
      celdaEliminar.addEventListener("click",function(){
        seguridad("bu",item.ID_Usuario);
      });

      celdaNombre.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNombre.innerHTML=item.Nombre;
          celdaApellido.innerHTML = item.Apellido;
          celdaPassword.innerHTML = "********";
          celdaEmail.innerHTML = item.Email;
          celdaUsuario.innerHTML = item.Usuario;
          celdaGrupo.innerHTML =id2grupo(item.Grupo);
        }
        if(evt.keyCode==13){
          celdaNombre.innerText = document.getElementById("N_"+item.ID_Usuario).value;
          celdaApellido.innerText= document.getElementById("A_"+item.ID_Usuario).value;
          celdaUsuario.innerText= document.getElementById("U_"+item.ID_Usuario).value;
          celdaPassword.innerText= document.getElementById("P_"+item.ID_Usuario).value;
          celdaEmail.innerText= document.getElementById("E_"+item.ID_Usuario).value;
          var gruposeleccionado=document.getElementById("G_"+item.ID_Usuario).value;
          celdaGrupo.innerText=id2grupo(gruposeleccionado);
          seguridad("mu",celdaNombre.innerText,celdaApellido.innerText,celdaUsuario.innerText,celdaPassword.innerText,celdaEmail.innerText,item.ID_Usuario,gruposeleccionado);
        }
      });
      celdaApellido.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNombre.innerHTML=item.Nombre;
          celdaApellido.innerHTML = item.Apellido;
          celdaPassword.innerHTML = "********";
          celdaEmail.innerHTML = item.Email;
          celdaUsuario.innerHTML = item.Usuario;
          celdaGrupo.innerHTML =id2grupo(item.Grupo);
        }
        if(evt.keyCode==13){
          celdaNombre.innerText = document.getElementById("N_"+item.ID_Usuario).value;
          celdaApellido.innerText= document.getElementById("A_"+item.ID_Usuario).value;
          celdaUsuario.innerText= document.getElementById("U_"+item.ID_Usuario).value;
          celdaPassword.innerText= document.getElementById("P_"+item.ID_Usuario).value;
          celdaEmail.innerText= document.getElementById("E_"+item.ID_Usuario).value;
          var gruposeleccionado=document.getElementById("G_"+item.ID_Usuario).value;
          celdaGrupo.innerText=id2grupo(gruposeleccionado);
          seguridad("mu",celdaNombre.innerText,celdaApellido.innerText,celdaUsuario.innerText,celdaPassword.innerText,celdaEmail.innerText,item.ID_Usuario,gruposeleccionado);
        }
      });
      celdaUsuario.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNombre.innerHTML=item.Nombre;
          celdaApellido.innerHTML = item.Apellido;
          celdaPassword.innerHTML = "********";
          celdaEmail.innerHTML = item.Email;
          celdaUsuario.innerHTML = item.Usuario;
          celdaGrupo.innerHTML =id2grupo(item.Grupo);
        }
        if(evt.keyCode==13){
          celdaNombre.innerText = document.getElementById("N_"+item.ID_Usuario).value;
          celdaApellido.innerText= document.getElementById("A_"+item.ID_Usuario).value;
          celdaUsuario.innerText= document.getElementById("U_"+item.ID_Usuario).value;
          celdaPassword.innerText= document.getElementById("P_"+item.ID_Usuario).value;
          celdaEmail.innerText= document.getElementById("E_"+item.ID_Usuario).value;
          var gruposeleccionado=document.getElementById("G_"+item.ID_Usuario).value;
          celdaGrupo.innerText=id2grupo(gruposeleccionado);

          seguridad("mu",celdaNombre.innerText,celdaApellido.innerText,celdaUsuario.innerText,celdaPassword.innerText,celdaEmail.innerText,item.ID_Usuario,gruposeleccionado);
        }
      });
      celdaPassword.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNombre.innerHTML=item.Nombre;
          celdaApellido.innerHTML = item.Apellido;
          celdaPassword.innerHTML = "********";
          celdaEmail.innerHTML = item.Email;
          celdaUsuario.innerHTML = item.Usuario;
          celdaGrupo.innerHTML =id2grupo(item.Grupo);
        }
        if(evt.keyCode==13){
          celdaNombre.innerText = document.getElementById("N_"+item.ID_Usuario).value;
          celdaApellido.innerText= document.getElementById("A_"+item.ID_Usuario).value;
          celdaUsuario.innerText= document.getElementById("U_"+item.ID_Usuario).value;
          celdaPassword.innerText= document.getElementById("P_"+item.ID_Usuario).value;
          celdaEmail.innerText= document.getElementById("E_"+item.ID_Usuario).value;
          var gruposeleccionado=document.getElementById("G_"+item.ID_Usuario).value;
          celdaGrupo.innerText=id2grupo(gruposeleccionado);

          seguridad("mu",celdaNombre.innerText,celdaApellido.innerText,celdaUsuario.innerText,celdaPassword.innerText,celdaEmail.innerText,item.ID_Usuario,gruposeleccionado);
        }
      });
      celdaEmail.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNombre.innerHTML=item.Nombre;
          celdaApellido.innerHTML = item.Apellido;
          celdaPassword.innerHTML = "********";
          celdaEmail.innerHTML = item.Email;
          celdaUsuario.innerHTML = item.Usuario;
          celdaGrupo.innerHTML =id2grupo(item.Grupo);
        }
        if(evt.keyCode==13){
          celdaNombre.innerText = document.getElementById("N_"+item.ID_Usuario).value;
          celdaApellido.innerText= document.getElementById("A_"+item.ID_Usuario).value;
          celdaUsuario.innerText= document.getElementById("U_"+item.ID_Usuario).value;
          celdaPassword.innerText= document.getElementById("P_"+item.ID_Usuario).value;
          celdaEmail.innerText= document.getElementById("E_"+item.ID_Usuario).value;
          var gruposeleccionado=document.getElementById("G_"+item.ID_Usuario).value;
          celdaGrupo.innerText=id2grupo(gruposeleccionado);
          seguridad("mu",celdaNombre.innerText,celdaApellido.innerText,celdaUsuario.innerText,celdaPassword.innerText,celdaEmail.innerText,item.ID_Usuario,gruposeleccionado);
        }
      });


    });
  
}

function llenarTablaTareasUsuarios(json_tabla){
  console.log(json_tabla);
  var tabla_usuarios=document.getElementById("tabla_tareas_usuarios");
  $("#tabla_tareas_usuarios").empty();
  var sliderPesoTareaUsuario=document.getElementById("peso_tarea_usuario");
  var lblPesoTareaUsuario=document.getElementById("lbl_peso_tarea_usuario");

  sliderPesoTareaUsuario.addEventListener("change",function(){
    lblPesoTareaUsuario.innerHTML=sliderPesoTareaUsuario.value;
  });



  //armo cabecera
  var fila=tabla_tareas_usuarios.insertRow();
    var celdaID = fila.insertCell(0);
    celdaID.style.display="none";
    var celdaUsuario = fila.insertCell(1);
    var celdaPeso = fila.insertCell(2);
    var celdaCumplimiento = fila.insertCell(3);
    var celdaEditar = fila.insertCell(4);
    var celdaEliminar = fila.insertCell(5);
    celdaID.innerHTML ="ID";
    celdaUsuario.innerHTML="<strong>Usuario</strong>";
    celdaPeso.innerHTML="<strong>Peso</strong>";
    celdaCumplimiento.innerHTML="<strong>Cumplimiento</strong>";
    celdaEditar.innerHTML="<strong>Editar</strong>";
    celdaEliminar.innerHTML="<strong>Eliminar</strong>";

    var tareas_usuarios_peso_total=0;
    json_tabla.forEach(function(item){
      
      var fila=tabla_usuarios.insertRow();
      var celdaID = fila.insertCell(0);
      celdaID.style.display="none";
      var celdaUsuario = fila.insertCell(1);
      var celdaPeso = fila.insertCell(2);
      var celdaCumplimiento = fila.insertCell(3);
      var celdaEditar = fila.insertCell(4);
      var celdaEliminar = fila.insertCell(5);
      celdaID.innerHTML =item.ID_Tarea_Usuario;
      celdaUsuario.innerHTML =item.Nombre; //item.ID_Usuario;
      celdaPeso.innerHTML = item.Peso;
      tareas_usuarios_peso_total+=parseInt(item.Peso);
      celdaCumplimiento.innerHTML = item.Cumplimiento;
      celdaEliminar.innerHTML="<a href='#'><img src='imagenes/borrar.png'></img></a>";
      celdaEliminar.addEventListener("click",function(){
        enviar("btu",item.ID_Tarea_Usuario,item.ID_Tarea);
      });

      celdaPeso.addEventListener("input",function(evt){
        var Peso_Actual=parseInt(evt.target.value);
        tareas_usuarios_peso_total=tareas_usuarios_peso_total-Peso_Anterior+Peso_Actual;
        Peso_Anterior=Peso_Actual;
        var status_tareas_usuarios=document.getElementById("status_tareas_usuarios");
        status_tareas_usuarios.innerHTML="<strong>"+tareas_usuarios_peso_total+"%</strong>";
        if(tareas_usuarios_peso_total==100){
            status_tareas_usuarios.style.color="#1EA01A";
        }else{
            status_tareas_usuarios.style.color="#F70624";
        }
        var lblPesoTablaTareaUsuarioEditar=document.getElementById("L_"+item.ID_Tarea_Usuario);
        lblPesoTablaTareaUsuarioEditar.innerHTML=Peso_Actual;
      });
      celdaPeso.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaPeso.innerHTML=item.Peso;
          var Peso_Actual=parseInt(item.Peso);
          tareas_usuarios_peso_total=tareas_usuarios_peso_total-Peso_Anterior+Peso_Actual;
          Peso_Anterior=Peso_Actual;
          var status_tareas_usuarios=document.getElementById("status_tareas_usuarios");
          status_tareas_usuarios.innerHTML="<strong>"+tareas_usuarios_peso_total+"%</strong>";
          if(tareas_usuarios_peso_total==100){
              status_tareas_usuarios.style.color="#1EA01A";
          }else{
              status_tareas_usuarios.style.color="#F70624";
          }
          
        }
        if(evt.keyCode==13){
          celdaPeso.innerHTML=document.getElementById("P_"+item.ID_Tarea_Usuario).value;
          enviar("mtu",celdaID.innerText,celdaPeso.innerText,item.ID_Tarea);
        }
    });
      celdaEditar.innerHTML="<a href='#'><img src='imagenes/editar.png'></img></a>";
      celdaEditar.addEventListener("click",function(){
        celdaPeso.innerHTML="<input type='range' id='P_"+item.ID_Tarea_Usuario+"' value='"+item.Peso+"' min=0 max=100 list='tickmarks' step='5'><label id='L_"+item.ID_Tarea_Usuario+"'></label>";
        Peso_Anterior=item.Peso;
        var lblPesoTablaTareaUsuarioEditar=document.getElementById("L_"+item.ID_Tarea_Usuario);
        lblPesoTablaTareaUsuarioEditar.innerHTML=item.Peso;
      });



    });
  var status_tareas_usuarios=document.getElementById("status_tareas_usuarios");
  status_tareas_usuarios.innerHTML="<strong>"+tareas_usuarios_peso_total+"%</strong>";
  if(tareas_usuarios_peso_total==100){
    status_tareas_usuarios.style.color="#1EA01A";
  }else{
    status_tareas_usuarios.style.color="#F70624";
  }
   document.getElementById("peso_tarea_usuario").value=100-tareas_usuarios_peso_total;
   lblPesoTareaUsuario.innerHTML=sliderPesoTareaUsuario.value;
}

function llenarTabla(json_tabla){
	var tabla_normativas=document.getElementById("tabla_normativas");
	$("#tabla_normativas").empty();
  document.getElementById("normativa").value="";
	var lbl_cumplimiento_total=document.getElementById("lbl_cumplimiento_total");
  
  var sliderPeso=document.getElementById("peso");
  var lblPeso=document.getElementById("lbl_peso");

  sliderPeso.addEventListener("input",function(){
    lblPeso.innerHTML=sliderPeso.value;
  });
	
	//armo cabecera
	var fila=tabla_normativas.insertRow();
		var celdaID = fila.insertCell(0);
    celdaID.style.display="none";
		var celdaNormativa = fila.insertCell(1);
		var celdaCumplimiento = fila.insertCell(2);
    var celdaPeso=fila.insertCell(3);
		var celdaEditar = fila.insertCell(4);
		var celdaEliminar = fila.insertCell(5);
		celdaID.innerHTML ="ID";
  		celdaNormativa.innerHTML = "<strong>Normativa</strong>";
  		celdaCumplimiento.innerHTML = "<strong>Cumplimiento</strong>";
      celdaPeso.innerHTML = "<strong>Peso</strong>";
  		celdaEditar.innerHTML="<strong>Editar</strong>";
  		celdaEliminar.innerHTML="<strong>Eliminar</strong>";

  var normativas_peso_total=0;
	json_tabla.forEach(function(item){
		var fila=tabla_normativas.insertRow();
		var celdaID = fila.insertCell(0);
    celdaID.style.display="none";
		var celdaNormativa = fila.insertCell(1);
		var celdaCumplimiento = fila.insertCell(2);
    var celdaPeso=fila.insertCell(3);
		var celdaEditar = fila.insertCell(4);
		var celdaEliminar = fila.insertCell(5);
		celdaID.innerHTML =item.ID_Normativa_General;
  	celdaNormativa.innerHTML = item.Normativa_General;
  	celdaNormativa.addEventListener("keydown",function(evt){
  			cancelo=false;
  			if(evt.keyCode==27){
  				cancelo=true;
  				celdaNormativa.innerHTML=item.Normativa_General;
          celdaPeso.innerHTML=item.Peso;
		  	}
  	});
    celdaPeso.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaNormativa.innerHTML=item.Normativa_General;
          celdaPeso.innerHTML=item.Peso;
        }
        if(evt.keyCode==13){
          celdaNormativa.innerHTML = document.getElementById(item.ID_Normativa_General).value;
          celdaPeso.innerHTML=document.getElementById("P_"+item.ID_Normativa_General).value;
          enviar("m",celdaID.innerText,celdaNormativa.innerText,celdaPeso.innerText);
        }
    });

    
  	celdaNormativa.addEventListener("change",function(){
  			if(cancelo==false){
  				celdaNormativa.innerHTML = document.getElementById(item.ID_Normativa_General).value;
          celdaPeso.innerHTML=document.getElementById("P_"+item.ID_Normativa_General).value;
  				enviar("m",celdaID.innerText,celdaNormativa.innerText,celdaPeso.innerText);
          console.log(celdaID.innerText+" : "+celdaNormativa.innerText);
  			}else{
          //console.log("cancelo");
  			}
  		});
    
    celdaPeso.addEventListener("input",function(evt){
        var Peso_Actual=parseInt(evt.target.value);
        normativas_peso_total=normativas_peso_total-Peso_Anterior+Peso_Actual;
        Peso_Anterior=Peso_Actual;
        var status=document.getElementById("status");
        status.innerHTML="<strong>"+normativas_peso_total+"%</strong>";
        if(normativas_peso_total==100){
            status.style.color="#1EA01A";
        }else{
            status.style.color="#F70624";
        }
        var lblPesoTablaEditar=document.getElementById("L_"+item.ID_Normativa_General);
        lblPesoTablaEditar.innerHTML=Peso_Actual;
      });
      

  		celdaCumplimiento.innerHTML = item.Cumplimiento;
      celdaPeso.innerHTML=item.Peso;
      normativas_peso_total+=parseInt(item.Peso);
  		celdaEditar.innerHTML="<a href='#'><img src='imagenes/editar.png'></img></a>";
  		celdaEditar.addEventListener("click",function(){
  			celdaNormativa.innerHTML="<input type´='text' id='"+item.ID_Normativa_General+"' value='"+item.Normativa_General+"' maxlength='50' style='width: 90%;'>";
        celdaPeso.innerHTML="<input type='range' id='P_"+item.ID_Normativa_General+"' value='"+item.Peso+"' min=0 max=100 list='tickmarks' step='5'><label id='L_"+item.ID_Normativa_General+"'></label>";
        Peso_Anterior=item.Peso;
        var lblPesoTablaEditar=document.getElementById("L_"+item.ID_Normativa_General);
        lblPesoTablaEditar.innerHTML=item.Peso;
  		});
  		celdaEliminar.innerHTML="<a href='#'><img src='imagenes/borrar.png'></img></a>";
  		celdaEliminar.addEventListener("click",function(){
  			enviar("b",item.ID_Normativa_General);
  		});
/*
      var sliderPesoTablaEditar=document.getElementById("P_"+item.ID_Normativa_General);
      var lblPesoTablaEditar=document.getElementById("L_"+item.ID_Normativa_General)
      sliderPesoTablaEditar.addEventListener("input",function(){
          lblPesoTablaEditar.innerHTML=sliderPesoTablaEditar.value;
      });
*/
      lbl_cumplimiento_total.innerHTML="Cumplimiento Total "+item.Cumplimiento_Total+"%";
	});
	var status=document.getElementById("status");
  status.innerHTML="<strong>"+normativas_peso_total+"%</strong>";
  if(normativas_peso_total==100){
    status.style.color="#1EA01A";
  }else{
    status.style.color="#F70624";
  }
  document.getElementById("peso").value=100-normativas_peso_total;
  lblPeso.innerHTML=sliderPeso.value;
}


function llenarSelect(json_tabla){
  $("#select_normativas").empty();
  var select_normativas=document.getElementById("select_normativas");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Normativa_General;
        opt.value=item.ID_Normativa_General;
        select_normativas.appendChild(opt);
  });
  select_normativas.selectedIndex=0;

  $("#select_normativas1").empty();
  var select_normativas1=document.getElementById("select_normativas1");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Normativa_General;
        opt.value=item.ID_Normativa_General;
        select_normativas1.appendChild(opt);
  });
  select_normativas1.selectedIndex=0;
  enviar("ld",select_normativas.value); //Listar 

  $("#select_normativas_tareas").empty();
  var select_normativas_tareas=document.getElementById("select_normativas_tareas");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Normativa_General;
        opt.value=item.ID_Normativa_General;
        select_normativas_tareas.appendChild(opt);
  });
  select_normativas_tareas.selectedIndex=0;
  enviar("ld",select_normativas_tareas.value); 

  $("#select_normativas_tareas_descripcion").empty();
  var select_normativas_tareas_descripcion=document.getElementById("select_normativas_tareas_descripcion");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Normativa_General;
        opt.value=item.ID_Normativa_General;
        select_normativas_tareas_descripcion.appendChild(opt);
  });
  select_normativas_tareas_descripcion.selectedIndex=0;
  enviar("ld",select_normativas_tareas_descripcion.value); 

  $("#select_normativas_tareas_usuarios").empty();
  var select_normativas_tareas_usuarios=document.getElementById("select_normativas_tareas_usuarios");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Normativa_General;
        opt.value=item.ID_Normativa_General;
        select_normativas_tareas_usuarios.appendChild(opt);
  });

  select_normativas_tareas_usuarios.selectedIndex=0;
  enviar("ld",select_normativas_tareas_usuarios.value);
}

function llenarSelectTareas(json_tabla){
  $("#select_tareas").empty();
  var select_tareas=document.getElementById("select_tareas");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Tarea;
        opt.value=item.ID_Tarea;
        select_tareas.appendChild(opt);
  });
  //select_tareas.selectedIndex=0;
  var event= new Event('change');
  select_tareas.dispatchEvent(event); //fuerzo el evento change para que muestre la 1er documentacion


  $("#select_tareas_tareas_usuarios").empty();
  var select_tareas_tareas_usuarios=document.getElementById("select_tareas_tareas_usuarios");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Tarea;
        opt.value=item.ID_Tarea;
        select_tareas_tareas_usuarios.appendChild(opt);
  });
  //select_tareas_tareas_usuarios.selectedIndex=0;
  var event= new Event('change');
  select_tareas_tareas_usuarios.dispatchEvent(event); //fuerzo el evento change para que muestre la 1er documentacion

  seguridad("lu");


}

function llenarSelectUsuarios(json_tabla){
  $("#select_usuarios_tareas_usuarios").empty();
  var select_usuarios_tareas_usuarios=document.getElementById("select_usuarios_tareas_usuarios");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Usuario;
        opt.value=item.ID_Usuario;
        select_usuarios_tareas_usuarios.appendChild(opt);
  });
  //select_usuarios_tareas_usuarios.selectedIndex=0;
}

function llenarSelectDominios(json_tabla){
  $("#select_documentacion").empty();
  var select_documentacion=document.getElementById("select_documentacion");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Dominio;
        opt.value=item.ID_Dominio;
        select_documentacion.appendChild(opt);
  });
  var event = new Event('change');
  select_documentacion.dispatchEvent(event); //fuerzo el evento change para que muestre la 1er documentacion


  $("#select_documentacion_tareas").empty();
  var select_documentacion_tareas=document.getElementById("select_documentacion_tareas");
  json_tabla.forEach(function(item){
        //console.log(item);
        var opt=document.createElement("option");
        opt.innerHTML=item.Dominio;
        opt.value=item.ID_Dominio;
        select_documentacion_tareas.appendChild(opt);
  });
  select_documentacion_tareas.selectedIndex=0;
  enviar("lt",select_documentacion_tareas.value);

  $("#select_documentacion_tareas_descripcion").empty();
  var select_documentacion_tareas_descripcion=document.getElementById("select_documentacion_tareas_descripcion");
  json_tabla.forEach(function(item){
        //console.log(item);
        var opt=document.createElement("option");
        opt.innerHTML=item.Dominio;
        opt.value=item.ID_Dominio;
        select_documentacion_tareas_descripcion.appendChild(opt);
  });
  select_documentacion_tareas_descripcion.selectedIndex=0;
  enviar("lt",select_documentacion_tareas_descripcion.value);



$("#select_dominios_tareas_usuarios").empty();
  var select_dominios_tareas_usuarios=document.getElementById("select_dominios_tareas_usuarios");
  json_tabla.forEach(function(item){
        //console.log(item);
        var opt=document.createElement("option");
        opt.innerHTML=item.Dominio;
        opt.value=item.ID_Dominio;
        select_dominios_tareas_usuarios.appendChild(opt);
  });
  select_dominios_tareas_usuarios.selectedIndex=0;
  enviar("lt",select_dominios_tareas_usuarios.value);
}
function llenarTablaDominios(json_tabla){
  //console.log(json_tabla);
  var tabla_dominio_normativas=document.getElementById("tabla_dominio_normativas");
  $("#tabla_dominio_normativas").empty();
  document.getElementById("dominio_normativa").value="";
  
  var sliderPesoDominio=document.getElementById("peso_dominio");
  var lblPesoDominio=document.getElementById("lbl_peso_dominio");

  sliderPesoDominio.addEventListener("input",function(){
    lblPesoDominio.innerHTML=sliderPesoDominio.value;
  });


  //armo cabecera
    var dominios_peso_total=0;
    var fila=tabla_dominio_normativas.insertRow();
    var celdaIDdominio = fila.insertCell(0);
    celdaIDdominio.style.display="none";
    var celdaIDnormativa = fila.insertCell(1);
    celdaIDnormativa.style.display="none";
    var celdaDominio = fila.insertCell(2);
    var celdaCumplimiento = fila.insertCell(3);
    var celdaPesoDominio=fila.insertCell(4)
    var celdaEditar = fila.insertCell(5);
    var celdaEliminar = fila.insertCell(6);
    celdaIDdominio.innerHTML ="ID Dominio";
    celdaIDnormativa.innerHTML ="ID Normativa";
    celdaDominio.innerHTML = "<strong>Dominios</strong>";
    celdaCumplimiento.innerHTML = "<strong>Cumplimiento</strong>";
    celdaPesoDominio.innerHTML = "<strong>Peso</strong>";
    celdaEditar.innerHTML="<strong>Editar</strong>";
    celdaEliminar.innerHTML="<strong>Eliminar</strong>";

  json_tabla.forEach(function(item){
    var fila=tabla_dominio_normativas.insertRow();
    var celdaIDdominio = fila.insertCell(0);
    celdaIDdominio.style.display="none";
    var celdaIDnormativa = fila.insertCell(1);
    celdaIDnormativa.style.display="none";
    var celdaDominio = fila.insertCell(2);
    var celdaCumplimiento = fila.insertCell(3);
    var celdaPesoDominio=fila.insertCell(4);
    var celdaEditar = fila.insertCell(5);
    var celdaEliminar = fila.insertCell(6);
    celdaIDdominio.innerHTML =item.ID_Dominio;
    celdaIDnormativa.innerHTML =item.ID_Normativa_General;
    ID_Normativa_General_Global=item.ID_Normativa_General;
      celdaDominio.innerHTML = item.Dominio;
      celdaDominio.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaDominio.innerHTML=item.Dominio;
          celdaPesoDominio.innerHTML=item.Peso_Dominio;
      }
      });

      celdaPesoDominio.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaDominio.innerHTML=item.Dominio;
          celdaPesoDominio.innerHTML=item.Peso_Dominio;
      }
        if(evt.keyCode==13){
          celdaDominio.innerHTML = document.getElementById(item.ID_Dominio).value;
          
          celdaPesoDominio.innerHTML=document.getElementById("P_"+item.ID_Normativa_General).value;

          select_dominio_seleccionado=item.ID_Normativa_General;
          enviar("md",celdaIDdominio.innerText,celdaDominio.innerText,celdaPesoDominio.innerText);
        }
      });

      celdaPesoDominio.addEventListener("input",function(evt){
        var Peso_Actual=parseInt(evt.target.value);
        dominios_peso_total=dominios_peso_total-Peso_Anterior+Peso_Actual;
        Peso_Anterior=Peso_Actual;
        var status=document.getElementById("status_dominios");
        status.innerHTML="<strong>"+dominios_peso_total+"%</strong>";
        if(dominios_peso_total==100){
            status.style.color="#1EA01A";
        }else{
            status.style.color="#F70624";
        }
        var lblPesoDominioTablaEditar=document.getElementById("L_"+item.ID_Normativa_General);
        lblPesoDominioTablaEditar.innerHTML=Peso_Actual;
      });
      

      celdaDominio.addEventListener("change",function(){
        if(cancelo==false){
          celdaDominio.innerHTML = document.getElementById(item.ID_Dominio).value;
          celdaPesoDominio.innerHTML=document.getElementById("P_"+item.ID_Normativa_General).value;
          
          select_dominio_seleccionado=item.ID_Normativa_General;
          enviar("md",celdaIDdominio.innerText,celdaDominio.innerText,celdaPesoDominio.innerText);
          //console.log(celdaIDdominio.innerText+" : "+celdaDominio.innerText+" . "+celdaPesoDominio.innerText);
        }else{
          //celdaNormativa.innerHTML=item.Normativa_General;
          //console.log("cancelo");
        }
      });

      celdaCumplimiento.innerHTML = item.Cumplimiento;
      celdaPesoDominio.innerHTML=item.Peso_Dominio;
      dominios_peso_total+=parseInt(item.Peso_Dominio);
      celdaEditar.innerHTML="<a href='#'><img src='imagenes/editar.png'></img></a>";
      celdaEditar.addEventListener("click",function(){
        celdaDominio.innerHTML="<input type´='text' id='"+item.ID_Dominio+"' value='"+item.Dominio+"' maxlength='50' style='width: 90%;'>";
        celdaPesoDominio.innerHTML="<input type='range' id='P_"+item.ID_Normativa_General+"' value='"+item.Peso_Dominio+"' min=0 max=100 list='tickmarks' step='5'><label id='L_"+item.ID_Normativa_General+"'></label>";
        Peso_Anterior=item.Peso_Dominio;
        var lblPesoTablaEditar=document.getElementById("L_"+item.ID_Normativa_General);
        lblPesoTablaEditar.innerHTML=item.Peso_Dominio;
      });
      celdaEliminar.innerHTML="<a href='#'><img src='imagenes/borrar.png'></img></a>";
      celdaEliminar.addEventListener("click",function(){
        enviar("bd",item.ID_Dominio);
      });
  });

  var status=document.getElementById("status_dominios");
  status.innerHTML="<strong>"+dominios_peso_total+"%</strong>";
  if(dominios_peso_total==100){
    status.style.color="#1EA01A";
  }else{
    status.style.color="#F70624";
  }
   document.getElementById("peso_dominio").value=100-dominios_peso_total;
   lblPesoDominio.innerHTML=sliderPesoDominio.value;
}

function llenarTablatareas(json_tabla){
 //console.log(json_tabla);
  var tabla_tareas=document.getElementById("tabla_tareas");
  $("#tabla_tareas").empty();
  //document.getElementById("dominio_normativa").value="";
  var sliderPesoTarea=document.getElementById("peso_tarea");
  var lblPesoTarea=document.getElementById("lbl_peso_tarea");

  sliderPesoTarea.addEventListener("input",function(){
    lblPesoTarea.innerHTML=sliderPesoTarea.value;

    
  });


  //armo cabecera
  var tareas_peso_total=0;
    var fila=tabla_tareas.insertRow();
    var celdaID = fila.insertCell(0);
    celdaID.style.display="none";
    var celdaIDdominio=fila.insertCell(1);
    celdaIDdominio.style.display="none";
    var celdaTarea = fila.insertCell(2);
    var celdaCumplimiento = fila.insertCell(3);
    var celdaPeso=fila.insertCell(4);
    var celdaEditar = fila.insertCell(5);
    var celdaEliminar = fila.insertCell(6);
    celdaID.innerHTML ="ID";
    celdaIDdominio.innerHTML = "<strong>ID Dominio</strong>";
    celdaTarea.innerHTML = "<strong>Tarea</strong>";
    celdaCumplimiento.innerHTML = "<strong>Cumplimiento</strong>";
    celdaPeso.innerHTML = "<strong>Peso</strong>";
    celdaEditar.innerHTML="<strong>Editar</strong>";
    celdaEliminar.innerHTML="<strong>Eliminar</strong>";

    json_tabla.forEach(function(item){
        var fila=tabla_tareas.insertRow();
        var celdaID = fila.insertCell(0);
        celdaID.style.display="none";
        var celdaIDdominio = fila.insertCell(1);
        celdaIDdominio.style.display="none";
        var celdaTarea = fila.insertCell(2);
        var celdaCumplimiento = fila.insertCell(3);
        var celdaPesoTarea=fila.insertCell(4);
        var celdaEditar = fila.insertCell(5);
        var celdaEliminar = fila.insertCell(6);
        celdaID.innerHTML =item.ID_Tarea;
        celdaIDdominio.innerHTML =item.ID_Dominio;
        celdaTarea.innerHTML =item.Tarea;
        celdaCumplimiento.innerHTML =item.Cumplimiento;
        celdaPesoTarea.innerHTML =item.Peso;


        celdaTarea.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaTarea.innerHTML=item.Tarea;
          celdaPesoTarea.innerHTML=item.Peso;
        }
        });
        celdaPesoTarea.addEventListener("keydown",function(evt){
        cancelo=false;
        if(evt.keyCode==27){
          cancelo=true;
          celdaTarea.innerHTML=item.Tarea;
          celdaPesoTarea.innerHTML=item.Peso;
        }
        if(evt.keyCode==13){
          celdaTarea.innerHTML = document.getElementById(item.ID_Tarea).value;
          
          celdaPesoTarea.innerHTML=document.getElementById("P_"+item.ID_Tarea).value;

          select_tarea_seleccionada=item.ID_Tarea;
         
          //console.log(celdaTarea.innerText+" - "+celdaPesoTarea.innerText+" - "+item.ID_Tarea+" - "+item.ID_Dominio);
          enviar("mt",item.ID_Tarea,item.ID_Dominio,celdaTarea.innerText,celdaPesoTarea.innerText);
        }
          
        });

        celdaTarea.addEventListener("change",function(){
        if(cancelo==false){
          celdaTarea.innerHTML = document.getElementById(item.ID_Tarea).value;
          celdaPesoTarea.innerHTML=document.getElementById("P_"+item.ID_Tarea).value;
          
          select_tarea_seleccionado=item.ID_Tarea;
          enviar("mt",item.ID_Tarea,item.ID_Dominio,celdaTarea.innerText,celdaPesoTarea.innerText);
        }else{
          //celdaNormativa.innerHTML=item.Normativa_General;
          console.log("cancelo");
        }
      });

        celdaPesoTarea.addEventListener("input",function(evt){
        var Peso_Actual=parseInt(evt.target.value);
        tareas_peso_total=tareas_peso_total-Peso_Anterior+Peso_Actual;
        Peso_Anterior=Peso_Actual;
        var status=document.getElementById("status_tareas");
        status.innerHTML="<strong>"+tareas_peso_total+"%</strong>";
        if(tareas_peso_total==100){
            status.style.color="#1EA01A";
        }else{
            status.style.color="#F70624";
        }
        var lblPesoTablatareaEditar=document.getElementById("L_"+item.ID_Tarea);
          lblPesoTablatareaEditar.innerHTML=Peso_Actual;
      });
        tareas_peso_total+=parseInt(item.Peso);
        celdaEditar.innerHTML="<a href='#'><img src='imagenes/editar.png'></img></a>";
        celdaEditar.addEventListener("click",function(){
          celdaTarea.innerHTML="<input type´='text' id='"+item.ID_Tarea+"' value='"+item.Tarea+"' maxlength='50' style='width: 90%;'>";
          celdaPesoTarea.innerHTML="<input type='range' id='P_"+item.ID_Tarea+"' value='"+item.Peso+"' min=0 max=100 list='tickmarks' step='5'><label id='L_"+item.ID_Tarea+"'></label>";
          Peso_Anterior=item.Peso;
          var lblPesoTablaTareaEditar=document.getElementById("L_"+item.ID_Tarea);
          lblPesoTablaTareaEditar.innerHTML=item.Peso;
        });
        celdaEliminar.innerHTML="<a href='#'><img src='imagenes/borrar.png'></img></a>";
        celdaEliminar.addEventListener("click",function(){
          enviar("bt",item.ID_Tarea,item.ID_Dominio);
        });


    });

    var status=document.getElementById("status_tareas");
  status.innerHTML="<strong>"+tareas_peso_total+"%</strong>";
  if(tareas_peso_total==100){
    status.style.color="#1EA01A";
  }else{
    status.style.color="#F70624";
  }
   document.getElementById("peso_tarea").value=100-tareas_peso_total;
   lblPesoTarea.innerHTML=sliderPesoTarea.value;
}

function llenarSelectCompletaTareaUsuario(json_tabla){
  console.log(json_tabla);
 $("#select_completar_usuario_tareas").empty();
  var select_completar_usuario_tareas=document.getElementById("select_completar_usuario_tareas");
  json_tabla.forEach(function(item){
        var opt=document.createElement("option");
        opt.innerHTML=item.Tarea;
        opt.value=item.ID_Tarea_Usuario;
        select_completar_usuario_tareas.appendChild(opt);
  });
  select_completar_usuario_tareas.selectedIndex=0;
  var event = new Event('change');
  select_completar_usuario_tareas.dispatchEvent(event);

}

function llenarCompletatareaUsuarioCumplimiento(json_tabla){
  var completar_tarea_cumplimiento=document.getElementById("completar_tarea_cumplimiento");

  var sliderCompletarTareaCumplimiento=document.getElementById("completar_tarea_cumplimiento");
  var lblCompletarTareaCumplimiento=document.getElementById("lbl_completar_tarea_cumplimiento");

  sliderCompletarTareaCumplimiento.addEventListener("input",function(){
    lblCompletarTareaCumplimiento.innerHTML=sliderCompletarTareaCumplimiento.value;
  });

  json_tabla.forEach(function(item){
      completar_tarea_cumplimiento.value=item.Cumplimiento;
      lblCompletarTareaCumplimiento.innerHTML=item.Cumplimiento;
  });
}