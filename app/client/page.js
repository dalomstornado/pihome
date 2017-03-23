const lineChartModule = require('./lineChart');
const dataHandler = require('./dataHandler');
const deviceHandler = require('../common/deviceHandler');
const api = require('./api');
const moment = require('moment');
const types = require('../common/types');

const getFromMoment = () => {
    const fromDays = 30;
    const from = moment().subtract(fromDays, 'd');
    return from;
};

const updateLineChart = (from, datas, measureType, namesLoaded) => {
    const lineChartData = dataHandler.lineChartData(from.toDate(), datas); //TODO: Moment øverallt (utom mongo?)
    console.log('lineChartData', lineChartData)
    console.log('namesLoaded', namesLoaded)
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded);
};

const addIfNotExisting = (array, item) => {
    if (!array.includes(item)) {
        array.push(item);
    }
}

const callHistoricalData = (sensors) => {
    const temperatureDatas = new Array();
    const humidityDatas = new Array();
    const namesLoaded = new Array();
    const from = getFromMoment();
    
    for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i];
        api.getTemperatures(sensor.id, from).then((data) => {
            console.log('data', data);
            temperatureDatas.push(data); //data should be one array with date, value
            console.log('temperatureDatas', temperatureDatas);
            addIfNotExisting(namesLoaded, sensor.name);
            updateLineChart(from, temperatureDatas, types.MeasureType.TEMPERATURE, namesLoaded);
        });
        /*api.getHumidities(sensor.id, from).then((data) => {
            humidityDatas.push(data);
            addIfNotExisting(namesLoaded, sensor.name);
            updateLineChart(from, humidityDatas, types.MeasureType.HUMIDITY, namesLoaded);
        });*/
    }
};

const init = (sensors) => {
    //callHistoricalData(sensors);
    let data = dataHandler.test();
    const lineChart = deviceHandler.getLineChart(types.MeasureType.TEMPERATURE);
    lineChartModule.drawLineChart(lineChart, data, ['test1', 'test2', 'test3']);  
}

//TEST START
const updateLineChart2 = (lineChart) => {
    const inDataTemp = [ { 
    date: '2016-01-10T00:57:36.211Z',
    sensorId: 135,
    severity: 0,
    value: 5 + Math.round(10 * Math.random()) },
  {
    date: '2016-02-10T03:57:28.991Z',
    sensorId: 135,
    severity: 0,
    value: 15 + Math.round(10 * Math.random()) },
  {
    date: '2016-03-10T20:30:02.291Z',
    sensorId: 135,
    severity: 0,
    value: -5 + Math.round(15 * Math.random()) },
  { 
    date: '2016-04-10T23:29:29.010Z',
    sensorId: 135,
    severity: 0,
    value: 15 + Math.round(10 * Math.random()) } ];

const inDataTemp2 = [ { 
    date: '2016-01-10T00:57:36.211Z',
    sensorId: 135,
    severity: 0,
    value: -5 + Math.round(15 * Math.random()) },
  {
    date: '2016-02-10T03:57:28.991Z',
    sensorId: 135,
    severity: 0,
    value: 0 + Math.round(15 * Math.random()) },
  {
    date: '2016-03-10T20:30:02.291Z',
    sensorId: 135,
    severity: 0,
    value: 10 + Math.round(15 * Math.random()) },
  { 
    date: '2016-04-10T23:29:29.010Z',
    sensorId: 135,
    severity: 0,
    value: 15 + Math.round(10 * Math.random()) } ];

const inDataTemp3 = [ { 
    date: '2016-01-10T00:57:36.211Z',
    sensorId: 135,
    severity: 0,
    value: -5 + Math.round(15 * Math.random()) },
  {
    date: '2016-02-10T03:57:28.991Z',
    sensorId: 135,
    severity: 0,
    value: 0 + Math.round(15 * Math.random()) },
  {
    date: '2016-03-10T20:30:02.291Z',
    sensorId: 135,
    severity: 0,
    value: 10 + Math.round(15 * Math.random()) },
  { 
    date: '2016-04-10T23:29:29.010Z',
    sensorId: 135,
    severity: 0,
    value: 15 + Math.round(10 * Math.random()) } ];

const inDataTemp4 = [ { 
    date: '2016-01-10T00:57:36.211Z',
    sensorId: 135,
    severity: 0,
    value: -5 + Math.round(15 * Math.random()) },
  {
    date: '2016-02-10T03:57:28.991Z',
    sensorId: 135,
    severity: 0,
    value: 0 + Math.round(15 * Math.random()) },
  {
    date: '2016-03-10T20:30:02.291Z',
    sensorId: 135,
    severity: 0,
    value: 10 + Math.round(15 * Math.random()) },
  { 
    date: '2016-04-10T23:29:29.010Z',
    sensorId: 135,
    severity: 0,
    value: 15 + Math.round(10 * Math.random()) } ];

    let values = dataHandler.lineChartData(new Date('2016-01-10'), [inDataTemp]);
    lineChartModule.drawLineChart(lineChart, values, ['Sensor 1']);
    
    setTimeout(() => {
        values = dataHandler.lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2]);
        lineChartModule.drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2']);
    }, 1000);
    
    setTimeout(() => {
        values = dataHandler.lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2, inDataTemp3]);
        lineChartModule.drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2', 'Sensor 3']);
    }, 2000);
    
    setTimeout(() => {
        values = dataHandler.lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2, inDataTemp3, inDataTemp4]);
        lineChartModule.drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor4']);
    }, 3000);
};

const test = () => {
	const lineCharts = deviceHandler.getLineCharts();    
    for (let myLineChart of lineCharts){
        //updateLineChart(lineChart);
    	setInterval(() => {
    		updateLineChart2(myLineChart);
    	}, 15000);
	}
};
//test();
//TEST END

export { init };