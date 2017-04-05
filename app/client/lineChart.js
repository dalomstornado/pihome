const options = {
  width: 700,
  height: 200,
};

let charts = new Map();
let chartData2 = null;
//DRAWLINE
let columns = new Map();

const drawLine = (lineChart, values, name) => {
  google.charts.setOnLoadCallback(() => {
    let columnIndex = columns[name];
    if (columnIndex === undefined) {
      chartData2.addColumn('number', name);
      columns.set(name, chartData.getNumberOfColumns() - 1);
    } else {
      chartData2.removeColumn(columnIndex);
    }

  });
};

const drawLineChart = (lineChart, values, names) => {
  google.charts.setOnLoadCallback(() => {
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
  });
};

const init = () => {
  google.charts.setOnLoadCallback(() => {
    chartData2 = new google.visualization.DataTable();
  });
};

export { drawLineChart, init };