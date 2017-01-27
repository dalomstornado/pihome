const optionsHumidity = {
  width: 400, height: 120,
  redFrom: 75, redTo: 100,
  yellowFrom:65, yellowTo: 75,
  minorTicks: 5, min: 35,
  max: 100
};

const optionsTemp = {
  width: 400, height: 120,
  redFrom: -10, redTo: 5,
  yellowFrom:5, yellowTo: 8,
  minorTicks: 5, min: -10,
  max: 30
};

const drawChart = (options) => {
  const data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    [options.sensorType, options.value]
  ]);

  let optionsGauge = optionsTemp;
  if (options.sensorType === 'Humidity') {
    optionsGauge = optionsHumidity;
  };

  const chart = new google.visualization.Gauge(document.getElementById(options.chartId));
  //date.setValue(0, 10) säät första gauge till 10
  chart.draw(data, optionsGauge);
};

const init = (sensors) => {
  //let data = google.visualization.arrayToDataTable  
  for (let sensor of sensors){
    for (let gauge of sensor.gauges){
      console.log(gauge.id);
    };
  };

  google.charts.setOnLoadCallback(function(){
    drawChart({ 
      sensorType: 'Temp',
      value: 0,
      chartId: 'gauge1' 
    })
  });

  google.charts.setOnLoadCallback(function(){
    drawChart({
      sensorType: 'Humidity',
      value: 0,
      chartId: 'gauge2' 
    })
  });
  google.charts.setOnLoadCallback(function(){
    drawChart({ 
      sensorType: 'Temp',
      value: 20,
      chartId: 'gauge3' 
    })
  });

  google.charts.setOnLoadCallback(function(){
    drawChart({
      sensorType: 'Humidity',
      value: 55,
      chartId: 'gauge4' 
    })
  });
};

export { drawChart, init };