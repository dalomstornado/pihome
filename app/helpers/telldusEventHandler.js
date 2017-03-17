const types = require('../common/types');
const deviceHandler = require('../common/deviceHandler');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
const moment = require('moment');

const getMeasureType = (type) => {
	switch (type) {
		case 1:
			return types.MeasureType.TEMPERATURE;
		case 2:
			return types.MeasureType.HUMIDITY;
		default:
			return types.UNKNOWN;
	}
};

const addSensorEventListener = () => {
	const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
		console.log('New sensor event received: ',deviceId,protocol,model,type,value,timestamp);
		const sensor = sensorHandler.getSensor(deviceId);
  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), moment(timestamp, 'x'));
  		if (event !== types.UNKNOWN) {
  			processEvent(event);
  		} else {
			console.log('Dropping sensor event. deviceId ', deviceId);	 
 		}
	});
	return listener;
};

const addDeviceEventListener = () => {
	const listener = telldus.addDeviceEventListener(function(deviceId, status) {
		console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
		const event = deviceHandler.createEvent(deviceId, types.MeasureType.ON_OFF, status.name)
		if (event !== types.UNKNOWN) {
			processEvent(event);
		} else {
			console.log('Dropping device event. deviceId ', deviceId);
		}
	});
	return listener;
};

const testDeviceEventListener = (deviceId, status) => {
	console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
	const event = deviceHandler.createEvent(deviceId, types.MeasureType.ON_OFF, status.name)
	if (event !== types.UNKNOWN) {
		processEvent(event);
	} else {
		console.log('Dropping device event. deviceId ', deviceId);
	}
};

const init = () => {
	const sensorListener = addSensorEventListener();
	const deviceListener = addDeviceEventListener();
	testDeviceEventListener(11, {name: types.Status.ON})
	//testDeviceEventListener(11, {name: types.Status.OFF})
};

module.exports = { init };