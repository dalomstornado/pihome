import { drawGauge } from './gauge';
import { MeasureType, SensorType } from '../common/types';
import { drawLineChart } from './lineChart';
import { lineChartData } from './dataHandler';

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

	const values = lineChartData(new Date('2016-01-10'), [inDataTemp, inDataTemp2]);
	drawLineChart(lineChart, values, ['inDataTemp', 'inDataTemp2']);
};

const updateGauge = (gauge) => {
	const valueHumidity = 35 + Math.round(65 * Math.random());
	const valueTemp = - 10 + Math.round(40 * Math.random());
	switch(gauge.type) {
		case MeasureType.TEMPERATURE:
			drawGauge(gauge, valueTemp);
		case MeasureType.HUMIDITY:
	}		drawGauge(gauge, valueHumidity);
};

const init = (sensors) => {
	for(let sensor of sensors){
		for(let gauge of sensor.gauges) {
			setInterval(() => {
				updateGauge(gauge);
			}, 3000 + Math.round(10000 * Math.random()));
		};
		for(let lineChart of sensor.lineCharts) {
			setInterval(() => {
				updateLineChart(lineChart);
			}, 3000 + Math.round(10000 * Math.random()));
		};
	};
};

export { init };