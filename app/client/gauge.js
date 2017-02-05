import { MeasureType, SensorType } from '../common/types';

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

const getOptions = (type) => {
  switch (type) {
    case MeasureType.TEMPERATURE:
      return optionsTemp;
    case MeasureType.HUMIDITY:
      return optionsHumidity;
    default:
      return undefined;
  };
};


let chartsData = undefined;
const charts = new Map();

const drawGauge = (gauge, value) => {
  const data = google.visualization.arrayToDataTable(chartsData.get(gauge.id));
  
  let chart = charts.get(gauge.id);
  if (!chart) {
    chart = new google.visualization.Gauge(document.getElementById(gauge.id));
    charts.set(gauge.id, chart);
  }
  if (value) {
    data.setValue(0, 1, value);
  }
  
  chart.draw(data, getOptions(gauge.type));
};

const init = (sensors) => {
  chartsData = new Map();
  
  for (let sensor of sensors){
    for (let gauge of sensor.gauges){
      let chartData = [['Label', 'Value'], [gauge.name, 0]];
      chartsData.set(gauge.id, chartData);

      google.charts.setOnLoadCallback(function(){
        drawGauge(gauge, 0);
      });
    };
  };
};

export { drawGauge, init };