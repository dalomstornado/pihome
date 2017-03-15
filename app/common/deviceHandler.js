const devices = require('./devices.json');
const types = require('./types.js');

const getDevice = (id) => {
	const device = devices.find((device) => {
		return device.id === id 
			&& device.type === types.DeviceType.ON_OFF; 
	});
	if (device) {
		return device;	
	}
	return types.UNKNOWN;
}

const getSensor = (id) => {
	const sensor = devices.find((sensor) => {
		return sensor.id === id
			&& device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	if (sensor) {
		return sensor;	
	}
	return types.UNKNOWN;
}

const getDevices = () => {
	const devices = devices.find((device) => {
		return device.type === types.DeviceType.ON_OFF; 
	});
	return devices;
}

const getSensors = (id) => {
	const sensors = devices.find((sensor) => {
		return device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	return sensors
}

const createEvent = (id) => {
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

module.exports = { getDevice, getSensor, getDevices, getSensors, createEvent };