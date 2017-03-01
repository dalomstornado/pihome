const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
const config = require('../models/config.json');
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
  			console.log('Dropping event', event);	
  		}
	});
	return listener;
};

const addDeviceEventListener = () => {
	const istener = telldus.addDeviceEventListener(function(deviceId, status) {
		console.log('status', status);
  		console.log('Device ' + deviceId + ' is now ' + status.name);
	});
	return listener;
};

const init = () => {
	const sensorListener = addDeviceEventListener();
	const deviceListener = addDeviceEventListener();
};

init();