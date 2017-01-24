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
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    [options.sensorType, options.value]
  ]);

  let optionsGauge = optionsTemp;
  if (options.sensorType === 'Humidity') {
    optionsGauge = optionsHumidity;
  };

  let chart = new google.visualization.Gauge(document.getElementById(options.chartId));
  chart.draw(data, optionsGauge);
};

module.exports = { drawChart };