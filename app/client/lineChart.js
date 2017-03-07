import { MeasureType, SensorType } from '../common/types';
const dataHandler = require('./dataHandler');
const moment = require('moment');

const options = {
  width: 600,
  height: 200,
};

const charts = new Map();
// let chartsData = undefined;

const drawLineChart = (lineChart, values) => {
  //var data = chartsData.get(lineChart.id);
  let chartData = new google.visualization.DataTable();
  chartData.addColumn('date');
  chartData.addColumn('number', 'Temp');
  chartData.addColumn('number', 'Temp outdoors');

  chartData.removeRows(0, chartData.getNumberOfRows());
  chartData.addRows(values);

  let chart = charts.get(lineChart.id);
  if (!chart) {
    chart = new google.charts.Line(document.getElementById(lineChart.id));
    charts.set(lineChart.id, chart);
  }
  chart.draw(chartData, options);
};

const init = (sensors) => {
  //chartsData = new Map();

  for (let sensor of sensors){    
    for (let lineChart of sensor.lineCharts){
      /*
      const chartData = new google.visualization.DataTable();
      chartData.addColumn('date', 'Date');
      chartData.addColumn('number', 'Temp');
      chartData.addColumn('number', 'Temp outdoors');
      chartsData.set(lineChart.id, chartData);
      */

      google.charts.setOnLoadCallback(function(){
        drawLineChart(lineChart, [[new Date(), 0, 0]]);
      });
    };
  };
};

export { init, drawLineChart };