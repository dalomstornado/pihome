const lineChartModule = require('./lineChart');
const dataHandler = require('./dataHandler');
const deviceHandler = require('../common/deviceHandler');
const api = require('./api');
const moment = require('moment');
const types = require('../common/types');
//const dh2 = require('./dataHandler2'); 

const updateLineChart = (from, datas, measureType, namesLoaded) => {
    const lineChartData = dataHandler.lineChartData(from, datas);
    const lineChart = deviceHandler.getLineChart(measureType);
    lineChartModule.drawLineChart(lineChart, lineChartData, namesLoaded.slice());
};

const update = (from, data, dataArray, namesLoaded, sensor, measureType) => {
    if (data.length) {
        dataArray.push(data);
        namesLoaded.push(sensor.name);
        updateLineChart(from, dataArray, measureType, namesLoaded);
    }
};

const getFromMoment = () => {
    const fromDays = 30;
    const from = moment().subtract(fromDays, 'd');
    return from;
};

const temperatureDatas = new Array();
const humidityDatas = new Array();
const namesLoadedTemperature = new Array();
const namesLoadedHumidity = new Array();
const from = getFromMoment();

const callHistoricalData = (sensors, index) => {
    const sensor = sensors[index];    
    api.getTemperatures(sensor.id, from).then((data) => {
        update(from, data, temperatureDatas, namesLoadedTemperature, sensor, types.MeasureType.TEMPERATURE);
        api.getHumidities(sensor.id, from).then((data) => {
            update(from, data, humidityDatas, namesLoadedHumidity, sensor, types.MeasureType.HUMIDITY);

            index++;
            if(index < sensors.length){
                callHistoricalData(sensors, index);
            }
        });
    });
};

const init = (sensors) => {
    callHistoricalData(sensors, 0);
};

export { init };