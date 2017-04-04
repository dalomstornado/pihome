const lineChartModule = require('./lineChart');
const dataHandler = require('./dataHandler');
const deviceHandler = require('../common/deviceHandler');
const api = require('./api');
const moment = require('moment');
const types = require('../common/types');
//const dh2 = require('./dataHandler2'); 

const getFromMoment = () => {
    const fromDays = 30;
    const from = moment().subtract(fromDays, 'd');
    return from;
};

const updateLineChart = (from, datas, measureType, namesLoaded) => {
    const lineChartData = dataHandler.lineChartData(from, datas);
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
    const namesLoadedTemperature = new Array();
    const namesLoadedHumidity = new Array();
    const from = getFromMoment();
    
    for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i];
        api.getTemperatures(sensor.id, from).then((data) => {
            if (data.length) {
                temperatureDatas.push(data);
                addIfNotExisting(namesLoadedTemperature, sensor.name);
        
                const drawTemperatureDatas = temperatureDatas.slice();
                const drawNamesLoadedTemperature = namesLoadedTemperature.slice();
                updateLineChart(from, drawTemperatureDatas, types.MeasureType.TEMPERATURE, drawNamesLoadedTemperature);
            }
        });
        api.getHumidities(sensor.id, from).then((data) => {
            if (data.length) {
                humidityDatas.push(data);
                addIfNotExisting(namesLoadedHumidity, sensor.name);

                const drawHumidityDatas = humidityDatas.slice();
                const drawNamesLoadedHumidity = namesLoadedHumidity.slice();
                updateLineChart(from, humidityDatas, types.MeasureType.HUMIDITY, drawNamesLoadedHumidity);
            }
        });
    }
};

const init = (sensors) => {
    callHistoricalData(sensors);
};

export { init };