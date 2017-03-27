const lineChartModule = require('./lineChart');
const dataHandler = require('./dataHandler');
const deviceHandler = require('../common/deviceHandler');
const api = require('./api');
const moment = require('moment');
const types = require('../common/types');
const gauge = require('./gauge');

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
            temperatureDatas.push(data); //data should be one array with date, value
            addIfNotExisting(namesLoaded, sensor.name);
            console.log('got ' + sensor.name);
            console.log('namesLoaded', namesLoaded);
            updateLineChart(from, temperatureDatas, types.MeasureType.TEMPERATURE, namesLoaded);
        });
        /*api.getHumidities(sensor.id, from).then((data) => {
            humidityDatas.push(data);
            addIfNotExisting(namesLoaded, sensor.name);
            updateLineChart(from, humidityDatas, types.MeasureType.HUMIDITY, namesLoaded);
        });*/
    }
};

const test = () => {
    let data = dataHandler.test();
    const lineChart = deviceHandler.getLineChart(types.MeasureType.TEMPERATURE);
    lineChartModule.drawLineChart(lineChart, data, ['test1', 'test2', 'test3']);
};

const init = (sensors) => {
    gauge.init(sensors);
    callHistoricalData(sensors);
    //test();
};

export { init };