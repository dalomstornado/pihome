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
const _from = moment().subtract(10, 'd')

const updateLineChart2 = (from, dataLoaded, measureType, namesLoaded) => {
    const lineChartData = dataHandler.lineChartDataAllWithNull(dataLoaded);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded.slice());
};

const updateLineChart = (from, dataLoaded, measureType, namesLoaded) => {
    const lineChartData = dataHandler.lineChartData(from, dataLoaded);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded.slice());
};

const addData = (from, data, dataLoaded, namesLoaded, sensor, measureType) => {
    if (data.length) {
        dataLoaded.push(data);
        namesLoaded.push(sensor.name);
        //updateLineChart(_from, dataLoaded, measureType, namesLoaded);
    }
};

const drawLineChartJoined = (data, sensor, measureType) => {
    const lineChartDataOne = dataHandler.lineChartDataOne(data);
    const lineChart = deviceHandler.getLineChart(measureType);
    return lineChartModule.drawLineChartJoined(lineChart, lineChartDataOne, sensor.name, measureType);
};

const callHistoricalData = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, _from).then((data) => {
        addData(_from.subtract(10, 'd'), data, dataLoadedTemperature, namesLoadedTemperature, sensor, types.MeasureType.TEMPERATURE);
        //drawLineChartJoined(data, sensor, types.MeasureType.TEMPERATURE).then(() => {
            api.getHumidities(sensor.id, _from).then((data) => {
                //addData(_from, data, dataLoadedHumidity, namesLoadedHumidity, sensor, types.MeasureType.HUMIDITY);
                index++;
                    if(index < sensors.length) {
                        callHistoricalData(sensors, index);
                    }

                //drawLineChartJoined(data, sensor, types.MeasureType.HUMIDITY).then(() => {
                    
                //});
            });
        //});
    });
};

const init = (sensors) => {
    callHistoricalData(sensors, 0);
    updateLineChart2(_from, dataLoadedTemperature, types.MeasureType.TEMPERATURE, namesLoadedTemperature);
};

export { init };