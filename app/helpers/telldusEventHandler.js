const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
const config = require('../models/config.json');
const devices = require('../models/devices.json');
const moment = require('moment');
const UNKNOWN = 'UNKNOWN';

const getSensorName = (deviceId) => {
	const sensor = config.sensors.find((sensor) => {
		return sensor.id === deviceId; 
	});
	if (sensor) {
		return sensor.name;	
	}
	return UNKNOWN;
};

const getDevice = (deviceId) => {
	const device = devices.find((device) => {
		return device.id === deviceId; 
	});
	if (device) {
		return device;	
	}
	return UNKNOWN;
};

const getMeasureType = (type) => {
	switch (type) {
		case 1:
			return types.MeasureType.TEMPERATURE;
		case 2:
			return types.MeasureType.HUMIDITY;
		default:
			return UNKNOWN;
	}
};

const addSensorEventListener = () => {
	const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
		console.log('New sensor event received: ',deviceId,protocol,model,type,value,timestamp);

  		const event = {
  			moment: moment(timestamp, 'x'),
  			sensor: {
  				id: deviceId,
  				name: getSensorName(deviceId)
  			},
  			measure: {
  				type: getMeasureType(type),
				value: Number.parseFloat(value)
  			}
  		};
  		if (event.sensor.name !== UNKNOWN && event.measure.type !== UNKNOWN) {
  			processEvent(event);
  		} else {
			console.log('Dropping sensor event. deviceId ', deviceId);	  		}
	});
	return listener;
};

const addDeviceEventListener = () => {
	const listener = telldus.addDeviceEventListener(function(deviceId, status) {
		console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);

		const device = getDevice(deviceId);
		if (device == UNKNOWN) {
			console.log('Dropping device event. deviceId ', deviceId);	
			return;
		}

		const event = {
			moment: moment(),
			sensor: {
				id: deviceId,
				name: device.name,
				triggers: device.triggers
			},
			measure: {
				type: types.MeasureType.ON_OFF,
				value: status.name
			},
		};
		processEvent(event);
	});
	return listener;
};

const testDeviceEventListener = (deviceId, status) => {
	console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
	const device = getDevice(deviceId);
	if (device == UNKNOWN) {
		console.log('Dropping device event. deviceId ', deviceId);	
		return;
	}

	const event = {
		moment: moment(),
		sensor: {
			id: deviceId,
			name: device.name,
			triggers: device.triggers
		},
		measure: {
			type: types.MeasureType.ON_OFF,
			value: status.name
		},
	};
	processEvent(event);
};

const init = () => {
	const sensorListener = addSensorEventListener();
	const deviceListener = addDeviceEventListener();
	testDeviceEventListener(11, {name: types.Status.ON})
	testDeviceEventListener(11, {name: types.Status.OFF})
};

init();