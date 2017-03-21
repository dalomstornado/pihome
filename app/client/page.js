import { drawGauge } from './gauge';
import { MeasureType, SensorType } from '../common/types';
import { drawLineChart } from './lineChart';
import { lineChartData } from './dataHandler';
import { getGauges, getLineCharts } from '../common/deviceHandler';

const updateLineChart = (lineChart) => {
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

	const values = lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2, inDataTemp3, inDataTemp4]);
	drawLineChart(lineChart, values, ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4']);
};

const init = (sensors) => {
	for(let sensor of sensors) {
		for(let lineChart of sensor.lineCharts) {
			setInterval(() => {
				updateLineChart(lineChart);
			}, 10000 + Math.round(10000 * Math.random()));
		}
	}
};

export { init };