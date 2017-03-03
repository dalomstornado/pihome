const config = require('../models/config.json');
const devices = require('../models/devices.json');
const types = require('../common/types.js')

const getDevice = (id) => {
	const device = devices.find((device) => {
		return device.id === id; 
	});
	if (device) {
		return device;	
	}
	return types.UNKNOWN;
}

const getSensor = (id) => {
	const sensor = config.sensors.find((sensor) => {
		return sensor.id === id; 
	});
	if (sensor) {
		return sensor;	
	}
	return types.UNKNOWN;
}

module.exports = { getDevice, getSensor };