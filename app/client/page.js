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

const updateLineChartAllValues = (dataLoaded, namesLoaded, measureType) => {
    const lineChartData = dataHandler.lineChartDataAllWithNull(dataLoaded);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded);
};

const updateLineChartReducedValues = (dataLoaded, namesLoaded, measureType, from) => {
    const lineChartData = dataHandler.lineChartData(from, dataLoaded);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded);
};

const addData = (data, dataLoaded, namesLoaded, sensor) => {
    if (data.length) {
        dataLoaded.push(data);
        namesLoaded.push(sensor.name);
    }
};

const callHistoricalDataOneByOne = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, _from).then((data) => {
        addData(data, dataLoadedTemperature, namesLoadedTemperature, sensor);
        updateLineChartReducedValues(dataLoadedTemperature.slice(), namesLoadedTemperature.slice(), types.MeasureType.TEMPERATURE, _from);
        api.getHumidities(sensor.id, _from).then((data) => {
            addData(data, dataLoadedHumidity, namesLoadedHumidity, sensor);
            updateLineChartReducedValues(dataLoadedHumidity.slice(), namesLoadedHumidity.slice(), types.MeasureType.HUMIDITY, _from);

            index++;
            if(index < sensors.length) {
                callHistoricalData(sensors, index);
            }
        });
    });
};

//TODO: refactor this to be one
const callHistoricalDataForTemperature = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, _from).then((data) => {
        addData(data, dataLoadedTemperature, namesLoadedTemperature, sensor);

        index++;
        if(index < sensors.length) {
            callHistoricalDataForTemperature(sensors, index);
        } else {
            updateLineChartAllValues(dataLoadedTemperature.slice(), namesLoadedTemperature.slice(), types.MeasureType.TEMPERATURE);
        }
    });
};

const callHistoricalDataForHumidity = (sensors, index) => {
    const sensor = sensors[index];    
    api.getHumidities(sensor.id, _from).then((data) => {
        addData(data, dataLoadedHumidity.slice(), namesLoadedHumidity.slice(), sensor);

        index++;
        if(index < sensors.length) {
            callHistoricalDataForHumidity(sensors, index);
        } else {
            updateLineChartAllValues(dataLoadedHumidity, namesLoadedHumidity.slice(), types.MeasureType.HUMIDITY);
        }
    });
};

const init = (sensors) => {
    //callHistoricalDataForTemperature(sensors, 0);
    //callHistoricalDataForHumidity(sensors, 0);
    callHistoricalDataOneByOne(sensors, 0);
};

export { init };