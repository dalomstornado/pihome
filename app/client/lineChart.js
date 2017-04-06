const Stopwatch = require('timer-stopwatch');
const types = require('../common/types');

const options = {
  width: 700,
  height: 200,
  interpolateNulls: true //TODO: check this
};

const charts = new Map();
let joinedDataTablesTemperature = undefined;
let joinedDataTablesHumidity = undefined; 

const drawLineChartJoined = (lineChart, values, name, measureType) => {
  return new Promise((resolve, reject) => {
    google.charts.setOnLoadCallback(() => {
      const stopwatch = new Stopwatch();
      stopwatch.start();

      const dataTable = new google.visualization.DataTable();
      dataTable.addColumn('date');
      dataTable.addColumn('number', name);
      dataTable.addRows(values);

      let joinedDataTables = undefined;
      switch (measureType) {
        case types.MeasureType.TEMPERATURE:
          joinedDataTables = joinedDataTablesTemperature;
          break;
        case types.MeasureType.HUMIDITY:
          joinedDataTables = joinedDataTablesHumidity;
          break;
      }

      if (joinedDataTables) {
        const keys = [[0, 0]]
        const dtColumns = [1];
        joinedDataTables = google.visualization.data.join(joinedDataTables, dataTable, 'full', keys, dtColumns, dtColumns);
      } else {
        joinedDataTables = dataTable;
      }

      // Create a formatter.
      // This example uses object literal notation to define the options.
      //var formatter = new google.visualization.DateFormat({formatType: 'long'});

      // Reformat our data.
      //formatter.format(data, 1);

      let chart = charts.get(lineChart.id);
      if (!chart) {
        chart = new google.charts.Line(document.getElementById(lineChart.id));
        charts.set(lineChart.id, chart);
      }
      chart.draw(joinedDataTables, options);
      stopwatch.stop();
      console.log(`Linechart drawn in ${stopwatch.ms} ms.`);
      resolve();
    });
  });
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

//TODO: remove this.
const init = () => {
  google.charts.setOnLoadCallback(() => {
    chartData2 = new google.visualization.DataTable();
  });
};

export { drawLineChart, drawLineChartJoined };