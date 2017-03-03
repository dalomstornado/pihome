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

const createEvent (id) => {
	//todo: can be both device or sensor event.

	return {
		moment: moment(),
			sensor: {
				id: device.id,
				name: device.name,
				triggers: device.triggers
			},
			measure: {
				type: types.MeasureType.ON_OFF,
				value: status.name
			},
	};	
}

module.exports = { getDevice, getSensor, createEvent };