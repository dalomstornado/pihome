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

	const addSensorEventListener = () => {
		const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
			console.log('New sensor event received: ', deviceId, protocol, model, type, value, timestamp);
	  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), moment(timestamp, 'x'));
	  		if (event !== types.UNKNOWN) {
	  			processEvent(event, websocket);
	  		} else {
				console.log('Dropping sensor event. deviceId ', deviceId);	 
	 		}
		});
		return listener;
	};

	const addDeviceEventListener = () => {
		const listener = telldus.addDeviceEventListener((deviceId, status) => {
			console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
			const event = deviceHandler.createEvent(deviceId, types.MeasureType.ON_OFF, status.name)
			if (event !== types.UNKNOWN) {
				processEvent(event, websocket);
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
			processEvent(event, websocket);
		} else {
			console.log('Dropping device event. deviceId ', deviceId);
		}
	};

	const testSensorEventListener = (deviceId, protocol, model, type, value, timestamp) => {
		console.log('New sensor event received: ', deviceId, protocol, model, type, value, timestamp);
	  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), moment(timestamp, 'x'));
	  		if (event !== types.UNKNOWN) {
	  			processEvent(event, websocket);
	  		} else {
				console.log('Dropping sensor event. deviceId ', deviceId);	 
	 		}
	};

	module.init = () => {
		const sensorListener = addSensorEventListener();
		const deviceListener = addDeviceEventListener();
		//testDeviceEventListener(11, {name: types.Status.ON}, websocket)
		//testDeviceEventListener(11, {name: types.Status.OFF}, websocket)

		setInterval(() => {
			let value = 1 + Math.round(2 * Math.random());
			testSensorEventListener(135, '', '', value, '10', '1234567');
		}, 0 + Math.round(15000 * Math.random()));
	};

	return module;
};