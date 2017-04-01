import { MeasureType, SensorType } from '../common/types';
import { getLowerLimit, getUpperLimit } from '../common/limits';
import { getGauges } from '../common/deviceHandler';
const $ = require('jquery');



const optionsHumidity = (sensorId) => {
  const upperLimit = getUpperLimit(MeasureType.HUMIDITY, sensorId);

  return {
    width: 400, height: 120,
    redFrom: upperLimit.ALARM, redTo: 95,
    yellowFrom: upperLimit.WARNING, yellowTo: ((upperLimit.ALARM) ? upperLimit.ALARM : 95),
    minorTicks: 5, min: 30,
    max: 95 
  } 
};

const optionsTemp = (sensorId) => {
  const lowerLimit = getLowerLimit(MeasureType.TEMPERATURE, sensorId);

  return {
    width: 400, height: 120,
    redFrom: -30, redTo: lowerLimit.ALARM,
    yellowFrom: lowerLimit.ALARM, yellowTo: lowerLimit.WARNING,
    minorTicks: 5, min: -30,
    max: 50
  }
};

const getOptions = (type, sensorId) => {
  switch (type) {
    case MeasureType.TEMPERATURE:
      return optionsTemp(sensorId);
    case MeasureType.HUMIDITY:
      return optionsHumidity(sensorId);
    default:
      return undefined;
  };
};

const afterDraw = (gauge) => {
  const $gauge = $('#' + gauge.id);
  const cssClass = 'updated'
  $gauge.addClass(cssClass);
  
  setTimeout(() => {
    $gauge.removeClass(cssClass)
  }, 1500);
};

let chartsData = undefined;
const charts = new Map();

const drawGauge = (gauge, value) => {
  google.charts.setOnLoadCallback(() => {
    const data = google.visualization.arrayToDataTable(chartsData.get(gauge.id));
    let chart = charts.get(gauge.id);
    if (!chart) {
      chart = new google.visualization.Gauge(document.getElementById(gauge.id));
      charts.set(gauge.id, chart);
    }
    if (value) {
      data.setValue(0, 1, value);
    }
    
    chart.draw(data, getOptions(gauge.type, gauge.sensor.id));
    afterDraw(gauge);
  });
};

const init = (sensors) => {
  chartsData = new Map();
   
  for (let sensor of sensors){
    const gauges = getGauges(sensor);
    for (let gauge of gauges){
      let chartData = [['Label', 'Value'], [gauge.name, 0]];
      chartsData.set(gauge.id, chartData);
      drawGauge(gauge, 0);
    };
  };
};

export { init, drawGauge };