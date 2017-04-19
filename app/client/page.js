const lineChartModule = require('./lineChart');
const dataHandler = require('./dataHandler');
const deviceHandler = require('../common/deviceHandler');
const api = require('./api');
const moment = require('moment');
const types = require('../common/types');

const dataLoadedTemperature = new Array();
const dataLoadedHumidity = new Array();
const namesLoadedTemperature = new Array();
const namesLoadedHumidity = new Array();
const _from = moment().subtract(40, 'd')

const drawLineChart = (dataLoaded, namesLoaded, measureType) => {
    const lineChartData = dataHandler.lineChartDataOverflow(dataLoaded);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded);
};

const addData = (data, dataLoaded, namesLoaded, sensor) => {
    dataLoaded.push(data);
    namesLoaded.push(sensor.name);
};

const callHistoricalDataOneByOne = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, _from).then((data) => {
        addData(data, dataLoadedTemperature, namesLoadedTemperature, sensor);
        drawLineChart(dataLoadedTemperature.slice(0), namesLoadedTemperature.slice(0), types.MeasureType.TEMPERATURE);
        api.getHumidities(sensor.id, _from).then((data) => {
            addData(data, dataLoadedHumidity, namesLoadedHumidity, sensor);
            drawLineChart(dataLoadedHumidity.slice(0), namesLoadedHumidity.slice(0), types.MeasureType.HUMIDITY);    
            index++;
            if(index < sensors.length) {
                callHistoricalDataOneByOne(sensors, index);
            }   
        });
    });
};

const init = (sensors) => {
    callHistoricalDataOneByOne(sensors, 0);
};

export { init };