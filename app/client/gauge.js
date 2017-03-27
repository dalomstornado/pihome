import { MeasureType, SensorType } from '../common/types';
import { LowerLimit, UpperLimit } from '../common/limits';
import { getGauges } from '../common/deviceHandler';
const $ = require('jquery');

const optionsHumidity = {
  width: 400, height: 120,
  redFrom: UpperLimit.HUMIDITY.ALARM, redTo: 95,
  yellowFrom:UpperLimit.HUMIDITY.WARNING, yellowTo: UpperLimit.HUMIDITY.ALARM,
  minorTicks: 5, min: 30,
  max: 95  
};

//TODO: Fix so this regards the id and checks in limits. -> LimitHandler
const optionsTemp = {
  width: 400, height: 120,
  redFrom: -30, redTo: LowerLimit.TEMPERATURE.ALARM,
  yellowFrom: LowerLimit.TEMPERATURE.ALARM, yellowTo: LowerLimit.TEMPERATURE.WARNING,
  minorTicks: 5, min: -30,
  max: 50
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

const afterDraw = (gauge) => {
  const $gauge = $('#' + gauge.id);
  const cssClass = 'updated'
  $gauge.addClass(cssClass);
  
  setTimeout(() => {
    $gauge.removeClass(cssClass)
  }, 2000);
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
    
    chart.draw(data, getOptions(gauge.type));
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

      google.charts.setOnLoadCallback(function(){
        drawGauge(gauge, 0);
      });
    };
  };
};

export { init, drawGauge };