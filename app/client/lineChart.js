const options = {
  width: 700,
  height: 200,
};

let charts = null;
let chartData = null;

const drawLine = (lineChart, values, name) => {
  google.charts.setOnLoadCallback(() => {

  });
};

const drawLineChart = (lineChart, values, names) => {
  google.charts.setOnLoadCallback(() => {
    chartData = new google.visualization.DataTable();
    
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
  });
};

const init = () => {
  google.charts.setOnLoadCallback(() => {
    charts = new Map();
    chartData = new google.visualization.DataTable();
  });
};

export { drawLineChart, init };