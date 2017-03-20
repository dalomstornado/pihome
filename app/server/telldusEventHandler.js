const types = require('../common/types');
const deviceHandler = require('../common/deviceHandler');
const processEvent = require('../server/processEvent');
const telldus = require('telldus');
const moment = require('moment');

module.exports = (websocket) => {
	const module = {};

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

	const doSensorEventListener = (deviceId, protocol, model, type, value, timestamp) => {
		console.log('New sensor event received: ', deviceId, protocol, model, type, value, timestamp);
  		
  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), moment(timestamp, 'x'));
  		if (event !== types.UNKNOWN) {
  			processEvent(event, websocket);
  		} else {
			console.log('Dropping sensor event. deviceId ', deviceId);	 
 		}
	}; 

	const addSensorEventListener = () => {
		const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
			doSensorEventListener(deviceId, protocol, model, type, value, timestamp);	
		});
		return listener;
	};

	const doDeviceEventListener = (deviceId, status) => {
		console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
		
		const event = deviceHandler.createEvent(deviceId, types.MeasureType.ON_OFF, status.name)
		if (event !== types.UNKNOWN) {
			processEvent(event, websocket);
		} else {
			console.log('Dropping device event. deviceId ', deviceId);
		}
	};

	const addDeviceEventListener = () => {
		const listener = telldus.addDeviceEventListener((deviceId, status) => {
			doDeviceEventListener(deviceId, status)
		});
		return listener;
	};

	module.init = () => {
		const sensorListener = addSensorEventListener();
		const deviceListener = addDeviceEventListener();

		setInterval(() => {
			let value = 1 + Math.round(2 * Math.random());
			doSensorEventListener(135, '', '', value, '10', '1234567');
		}, 0 + Math.round(15000 * Math.random()));
	};

	return module;
};