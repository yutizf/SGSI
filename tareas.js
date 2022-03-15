$(document).ready(function(){

  $("#btn_grabar_tarea").click(function(){
    tarea=document.getElementById("textarea_tarea_descripcion");
    id_tarea=document.getElementById("id_tareas");
    //console.log("hola");
    enviar("mtar",tarea.value,id_tarea.value); 
  });

});

function enviar(operacion,valor,valor2) {
  				var xhttp = new XMLHttpRequest();
  				xhttp.onreadystatechange = function() {
    				if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
    					//var json=JSON.parse(this.responseText);
              if(operacion=="mtar"){
     					  //llenarTabla(json);
              }
              
    				}
  				};
  		xhttp.open("POST", "n_general.php", true);
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		
  		if(operacion=="mtar"){
  			xhttp.send("operacion=mtar&id_tarea="+valor2+"&tarea="+valor);
  		}
      
}