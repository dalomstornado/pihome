const devices = require('./devices.json');
const types = require('./types.js');
const moment = require('moment');

const getGauges = (sensor) => {
	return [ { id: 'gauge-temp-' + sensor.id, type: types.MeasureType.TEMPERATURE, name: 'Temp' },
 		{ id: 'gauge-humidity-' + sensor.id, type: types.MeasureType.HUMIDITY, name: 'Humidity' } ];
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

module.exports = { getGauges, getGauge, getSensors, getSensorOrDevice, createEvent };