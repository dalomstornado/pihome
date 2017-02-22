import { MeasureType, SensorType } from '../common/types';
const dataHandler = require('./dataHandler');
const moment = require('moment');

const options = {
  width: 1000,
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
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'Date');
  data.addColumn('number', 'Temp');
  data.addColumn('number', 'Temp outdoors');

  let dataRows = dataHandler.convertRawDataToLineChartFriendly();  
/*
  dataRows = [];  
  
  for (let i = 0; i < 4*30 ; i++) { //60 * 24 * 30
    let now = Date();
    let date = new Date();
    let data = [moment(now).add(i*3, 'hour').toDate(),
      7.5 + Math.round(4 * Math.random()),
      -10.5 + Math.round(15 * Math.random())];
    dataRows.push(data);
  };
*/  
  data.addRows(dataRows);

  for(let lineChart of lineCharts){
    var chart = new google.charts.Line(document.getElementById(lineChart.id));
    chart.draw(data, options);
  };
};

const init = () => {
     google.charts.setOnLoadCallback(draw);
};

export { init };