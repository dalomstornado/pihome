import { MeasureType, SensorType } from '../common/types';

const options = {
  width: 600,
  height: 200,
};

const charts = new Map();

const drawLineChart = (lineChart, values, names) => {
  let chartData = new google.visualization.DataTable();
  chartData.addColumn('date');
  for(let i = 0; i < names.length; i++) {
    chartData.addColumn('number', names[i]);    
  }

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
  for (let sensor of sensors){    
    for (let lineChart of sensor.lineCharts){
      google.charts.setOnLoadCallback(function(){
        drawLineChart(lineChart, [[new Date(), 0]], ['serie1']); 
      });
    };
  };
};

export { init, drawLineChart };