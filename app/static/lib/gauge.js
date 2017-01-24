function drawChart() {

  var dataTemp = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Temp', 10]
  ]);

  var dataHumidity = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Humidity', 55]
  ]);

  var optionsTemp = {
    width: 400, height: 120,
    redFrom: -10, redTo: 5,
    yellowFrom:5, yellowTo: 8,
    minorTicks: 5, min: -10,
    max: 30
  };

  var optionsHumidity = {
    width: 400, height: 120,
    redFrom: 75, redTo: 100,
    yellowFrom:65, yellowTo: 75,
    minorTicks: 5, min: 35,
    max: 100
  };

  var chartTemp = new google.visualization.Gauge(document.getElementById('chart_div'));
  chartTemp.draw(dataTemp, optionsTemp);
  
  var chartHumidity = new google.visualization.Gauge(document.getElementById('chart_div2'));
  chartHumidity.draw(dataHumidity, optionsHumidity);
}