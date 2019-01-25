const devices = require('./devices.json');
const types = require('./types.js');
const moment = require('moment');

const getLineCharts = () => {
	return [ {
		id: 'linechart-temp',
		type: types.MeasureType.TEMPERATURE,
		name: 'Temp'
	}, {
		id: 'linechart-humidity',
		type: types.MeasureType.HUMIDITY,
		name: 'Fukt'
	} ];
};

const getLineChart = (measureType) => {
	return getLineCharts().find((lineChart) => {
		return lineChart.type === measureType;
	});
};

const getGauges = (sensor) => {
	return [ { 
		id: 'gauge-temp-' + sensor.id,
		type: types.MeasureType.TEMPERATURE, 
		name: 'Temp',
		sensor: {
			id: sensor.id
		} 
	}, { 
		id: 'gauge-humidity-' + sensor.id, 
		type: types.MeasureType.HUMIDITY, 
		name: 'Fukt',
		sensor: {
			id: sensor.id
		}
	} ];
};

const getGauge = (sensor, measureType) => {
	return getGauges(sensor).find((gauge) => {
		return gauge.type === measureType;
	});
};

const getSensors = () => {
	return devices.filter((device) => {
		return device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
};

const getSensorOrDevice = (id) => {
	return devices.find((device) => {
		return device.id === id; 
	});
};

const createEventByEvent = (event) =>{
	var newEvent = JSON.parse(JSON.stringify(event));
	newEvent.moment = moment();
	return newEvent;
}

const createEvent = (id, measureType, value, eventMoment = moment()) => {
	const sensorOrDevice = getSensorOrDevice(id);
	if (sensorOrDevice && measureType !== types.UNKNOWN) {
		return {
			moment: eventMoment,
				sensor: {
					id: sensorOrDevice.id,
					name: sensorOrDevice.name,
					triggers: sensorOrDevice.triggers
				},
				measure: {
					type: measureType,
					value
				},
		};
	}
	return types.UNKNOWN;
};

module.exports = { getLineCharts, getLineChart, getGauges, getGauge, getSensors, getSensorOrDevice, createEvent, createEventByEvent };