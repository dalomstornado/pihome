import { MeasureType, SensorType } from '../common/types';

const options = {
  width: 400,
  height: 200,
};

const lineCharts = 
  [
    {
      "id": "lineChart11",
      "type": "temp"
    },
    {
      "id": "lineChart12",
      "type": "humidity"
    }
  ];

const draw = () => {
  console.log('TEMP: ' + MeasureType.TEMPERATURE);

  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Temp');
  data.addColumn('number', 'Temp outdoors');
  data.addRows([
    [new Date(2017, 1, 1), 20, 10],
    [new Date(2017, 1, 5), 18, 5],
    [new Date(2017, 1, 10), 16, 0],
    [new Date(2017, 1, 15), 22, 12]
  ]);
  
  for(let lineChart of lineCharts){
    var chart = new google.charts.Line(document.getElementById(lineChart.id));
    chart.draw(data, options);
  };
};

const init = () => {
     google.charts.setOnLoadCallback(draw);
};

export { init };