const devices = require('./devices.json');
const types = require('./types.js');
const moment = require('moment');

const getGauges = (sensor) => {
	return [ { id: 'gauge-temp-' + sensor.id, type: types.MeasureType.TEMPERATURE, name: 'Temp' },
 		{ id: 'gauge-humidity-' + sensor.id, type: types.MeasureType.HUMIDITY, name: 'Humidity' } ];
};

const getDevice = (id) => {
	const device = devices.find((device) => {
		return device.id === id 
			&& device.type === types.DeviceType.ON_OFF; 
	});
	if (device) {
		return device;	
	}
	return types.UNKNOWN;
};

const getDevices = () => {
	const devices = devices.filter((device) => {
		return device.type === types.DeviceType.ON_OFF; 
	});
	return devices;
};

const getSensor = (id) => {
	const sensor = devices.find((device) => {
		return device.id === id
			&& device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	if (sensor) {
		return sensor;	
	}
	return types.UNKNOWN;
};

const getSensors = () => {
	const sensors = devices.filter((device) => {
		return device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	return sensors
};

const getSensorOrDevice = (id) => {
	const sensorOrDevice = devices.find((device) => {
		return device.id === id; 
	});
	return sensorOrDevice;
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

module.exports = { getGauges, getDevice, getDevices, getSensor, getSensors, createEvent };