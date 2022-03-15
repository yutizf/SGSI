$(document).ready(function(){

  $("#btn_grabar").click(function(){
    normativa=document.getElementById("textarea_documento");
    id_documento=document.getElementById("id_documento");
    console.log("hola");
    enviar("mdoc",normativa.value,id_documento.value); 
  });

});

function enviar(operacion,valor,valor2) {
  				var xhttp = new XMLHttpRequest();
  				xhttp.onreadystatechange = function() {
    				if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
    					//var json=JSON.parse(this.responseText);
              if(operacion=="mdoc"){
     					  //llenarTabla(json);
              }
              
    				}
  				};
  		xhttp.open("POST", "n_general.php", true);
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		
  		if(operacion=="mdoc"){
  			xhttp.send("operacion=mdoc&id_dominio="+valor2+"&dominio="+valor);
  		}
      
}