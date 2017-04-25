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
    const lineChart = deviceHandler.getLineChart(measureType);
    const lineChartData = dataHandler.lineChartDataOverflow(dataLoaded);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded);
};

const addData = (data, dataLoaded, namesLoaded, sensor) => {
    for(let i = 0; i < data.length; i++){
        data[i].date = new Date(data[i].date);
    }

    dataLoaded.push(data);
    namesLoaded.push(sensor.name);
};

const newData = (data, sensor, measureType) => {
    switch (measureType) {
        case types.MeasureType.TEMPERATURE:
            addData(data, dataLoadedTemperature, namesLoadedTemperature, sensor);
            drawLineChart(dataLoadedTemperature.slice(0), namesLoadedTemperature.slice(0), measureType);
            break;
        case types.MeasureType.HUMIDITY:
            addData(data, dataLoadedHumidity, namesLoadedHumidity, sensor);
            drawLineChart(dataLoadedHumidity.slice(0), namesLoadedHumidity.slice(0), measureType);
            break;
    }
}

const callHistoricalDataOneByOne = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, _from).then((data) => {
        newData(data, sensor, types.MeasureType.TEMPERATURE);
        api.getHumidities(sensor.id, _from).then((data) => {
            newData(data, sensor, types.MeasureType.HUMIDITY);

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