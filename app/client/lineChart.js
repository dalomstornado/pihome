const Stopwatch = require('timer-stopwatch');
const types = require('../common/types');

const charts = new Map();

const options = {
  width: 700,
  height: 200,
  interpolateNulls: true
};

const drawLineChart = (lineChart, values, names) => {
  google.charts.setOnLoadCallback(() => {
    const stopwatch = new Stopwatch();
    stopwatch.start();

    const chartData = new google.visualization.DataTable();
    chartData.addColumn('date');
    for(let i = 0; i < names.length; i++) {
      chartData.addColumn('number', names[i]);    
    }
    chartData.addRows(values);
    //chartData.sort([{column: 0}]);

    let chart = charts.get(lineChart.id);
    if (!chart) {
      chart = new google.charts.Line(document.getElementById(lineChart.id));
      charts.set(lineChart.id, chart);
    }
    chart.draw(chartData, options);
    
    stopwatch.stop();
    console.log(`Linechart drawn in ${stopwatch.ms} ms.`);
  });
};

export { drawLineChart };