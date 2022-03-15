function armaDashboard() {

traeDatos("l");


}

function traeDatos(operacion,valor,valor2,valor3,valor4) {
  				var xhttp = new XMLHttpRequest();
  				xhttp.onreadystatechange = function() {
    			if (this.readyState == 4 && this.status == 200) {
              //console.log(this.responseText);
    					var json=JSON.parse(this.responseText);
    					//console.log(json);
              if(operacion=="l"){
                graficaNormativas(json);
              }
              if(operacion=="ld"){
                graficaDominio(json,valor2);
              }
              $(".procesando").hide();
    				}
  				};
      $(".procesando").show();
  		xhttp.open("POST", "n_general.php", true);
  		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  		
  		if(operacion=="l"){
  			xhttp.send("operacion=l");
  		}
      if(operacion=="ld"){
        xhttp.send("operacion=ld&id_normativa_general="+valor);
      }
      
}
function graficaNormativas(json_tabla){
	
	var labelsX=new Array();
	var cumplimiento=new Array();
  var cumplimientoP=new Array();
  var colorFondo=new Array();
  var colorBorde=new Array();
  var peso=new Array();
	json_tabla.forEach(function(item){
		labelsX.push(item.Normativa_General);
		cumplimiento.push(item.Cumplimiento);
    cumplimientoP.push((item.Cumplimiento*item.Peso)/100);
    peso.push(item.Peso);
    colorVariableR=Math.floor(Math.random() * 255);
    colorVariableG=Math.floor(Math.random() * 255);
    colorVariableB=Math.floor(Math.random() * 255);
    colorFondo.push("rgba("+colorVariableR+","+colorVariableG+","+colorVariableB+", 1)");
    colorBorde.push("rgba(54,255,235,1");
    traeDatos("ld",item.ID_Normativa_General,item.Normativa_General);
	});

  graficaBarras("Normativas",labelsX,cumplimiento,colorFondo,colorBorde);
  graficaRadar("Normativas",labelsX,cumplimientoP,peso,colorFondo,colorBorde);
}

function graficaBarras(tituloGeneral,titulosX,valores,fondoColor,bordeColor){
      var canvas = document.createElement("CANVAS");
      var barras = canvas.getContext("2d");
      document.body.appendChild(canvas);
      //var barras = document.getElementById('chartNormativas').getContext('2d');
      var myChart = new Chart(barras, {
          type: 'bar',
          data: {
              labels: titulosX,
              datasets: [{
                  label: tituloGeneral,
                  data: valores,
                  backgroundColor: fondoColor,
                  borderColor: bordeColor,
                  borderWidth: 1
              }]
          },
          options: {
          	responsive: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
      
}

function graficaRadar(tituloGeneral,titulosX,valores1,valores2,fondoColor,bordeColor){
        var canvas = document.createElement("CANVAS");
        var radar = canvas.getContext("2d");
        document.body.appendChild(canvas);
        //var radar = document.getElementById('chartNormativasRadar').getContext('2d');
        var marksData = {
          labels: titulosX,
          datasets: [{
            label: "Cumplimiento",
            backgroundColor: "transparent",
            borderColor: "rgba(200,0,0,0.6)",
            fill: false,
            radius: 6,
            pointRadius: 6,
            pointBorderWidth: 3,
            pointBackgroundColor: "orange",
            pointBorderColor: "rgba(200,0,0,0.6)",
            pointHoverRadius: 10,
            data: valores1
          }, {
            label: "Peso",
            backgroundColor: "transparent",
            borderColor: "rgba(0,0,200,0.6)",
            fill: false,
            radius: 6,
            pointRadius: 6,
            pointBorderWidth: 3,
            pointBackgroundColor: "cornflowerblue",
            pointBorderColor: "rgba(0,0,200,0.6)",
            pointHoverRadius: 10,
            data: valores2
          }]
        };
         
        var chartOptions = {
          responsive: false,
          scale: {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: Math.max(...valores2),
              stepSize: 20
            },
            pointLabels: {
              fontSize: 18
            }
          },
          legend: {
            position: 'top'
          }
        };
        var myRadar=new Chart(radar,{
              type: 'radar',
                data: marksData,
                options: chartOptions

          });
        //valores2=parseInt(valores2,10);
        console.log(Math.max(...valores2)+" | "+typeof(valores2[0]));
}

function graficaDominio(json_tabla,dominio){
  console.log(json_tabla);

  var labelsX=new Array();
  var cumplimiento=new Array();
  var cumplimientoP=new Array();
  var colorFondo=new Array();
  var colorBorde=new Array();
  var peso_dominio=new Array();
  json_tabla.forEach(function(item){
    labelsX.push(item.Dominio);
    cumplimiento.push(item.Cumplimiento);
    cumplimientoP.push((item.Cumplimiento*item.Peso_Dominio)/100);
    peso_dominio.push(item.Peso_Dominio);
    colorVariableR=Math.floor(Math.random() * 255);
    colorVariableG=Math.floor(Math.random() * 255);
    colorVariableB=Math.floor(Math.random() * 255);
    colorFondo.push("rgba("+colorVariableR+","+colorVariableG+","+colorVariableB+", 1)");
    //colorFondo.push("rgba(155, 99, "+colorVariable+", 1)");
    colorBorde.push("rgba(54,255,235,1");
  });

  graficaBarras(dominio,labelsX,cumplimiento,colorFondo,colorBorde);
  //graficaRadar(dominio,labelsX,cumplimientoP,peso,colorFondo,colorBorde);

}