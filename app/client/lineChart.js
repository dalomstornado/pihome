import { MeasureType, SensorType } from '../common/types';
import { getLineCharts } from '../common/deviceHandler';

const options = {
  width: 700,
  height: 200,
};

const charts = new Map();

const drawLineChart = (lineChart, values, names) => {
  let chartData = new google.visualization.DataTable();
  chartData.addColumn('date');
  for(let i = 0; i < names.length; i++) {
    chartData.addColumn('number', names[i]);    
  }

  //TODO: Make this smarter not removing all lines
  chartData.removeRows(0, chartData.getNumberOfRows());
  chartData.addRows(values);

  let chart = charts.get(lineChart.id);
  if (!chart) {
    chart = new google.charts.Line(document.getElementById(lineChart.id));
    charts.set(lineChart.id, chart);
  }
  chart.draw(chartData, options);
};

const init = () => {
  const lineCharts = getLineCharts();    
  for (let lineChart of lineCharts){
    google.charts.setOnLoadCallback(function(){
      drawLineChart(lineChart, [[new Date(), 0]], ['serie1']); 
    });
  }
};


export { init, drawLineChart };