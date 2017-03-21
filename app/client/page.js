import { drawGauge } from './gauge';
import { MeasureType, SensorType } from '../common/types';
import { drawLineChart } from './lineChart';
import { lineChartData } from './dataHandler';
import { getGauges, getLineCharts } from '../common/deviceHandler';
const api = require('./api');
const moment = require('moment');
const dataHandler = require('./dataHandler');

const getFromDate = () => {
    const fromDays = 30;
    const from = moment().subtract(fromDays, 'd');
    return from.toDate();
};

const temperatureDatas = new Map();
const humidityDatas = new Map();

const updateLineChart = (from, datas, measureType) => {
    const values = dataHandler.lineChartData(from, datas);
    const lineChart = deviceHandler.getLineChart(measureType);
    drawLineChart(lineChart, values, datas.keys());
};

const callHistoricalData = (sensors) => {
    const from = getFromDate();
    console.log('sensors', sensors);
    for (let sensor of sensors) {
        api.getTemperatures(sensor.id, from).then((data) => {
            temperatureDatas[sensor.name] = data;
            updateLineChart(from, temperatureDatas, types.MeasureType.TEMPERATURE);
        });
        api.getHumidities(sensor.id, from).then((data) => {
            humidityDatas[sensor.name] = data;
            updateLineChart(from, humidityDatas, types.MeasureType.HUMIDITY);
        });
    }
};

const init = (sensors) => {
    callHistoricalData(sensors);
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

    let values = lineChartData(new Date('2016-01-10'), [inDataTemp]);
    drawLineChart(lineChart, values, ['Sensor 1']);
    
    setTimeout(() => {
        values = lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2]);
        drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2']);
    }, 1000);
    
    setTimeout(() => {
        values = lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2, inDataTemp3]);
        drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2', 'Sensor 3']);
    }, 2000);
    
    setTimeout(() => {
        values = lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2, inDataTemp3, inDataTemp4]);
        drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor4']);
    }, 3000);
};

const test = () => {
	const lineCharts = getLineCharts();    
    for (let lineChart of lineCharts){
        //updateLineChart(lineChart);
    	setInterval(() => {
    		updateLineChart2(lineChart);
    	}, 15000);
	}
};
//test();
//TEST END

export { init };