const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
const moment = require('moment');
const sensorHandler = require('../helpers/sensorHandler');

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
  		const event = {
  			moment: moment(timestamp, 'x'),
  			sensor: {
  				id: sensor.id,
  				name: sensor.name
  			},
  			measure: {
  				type: getMeasureType(type),
				value: Number.parseFloat(value)
  			}
  		};
  		if (event.sensor.name !== types.UNKNOWN && event.measure.type !== types.UNKNOWN) {
  			processEvent(event);
  		} else {
			console.log('Dropping sensor event. deviceId ', deviceId);	  		}
	});
	return listener;
};

const addDeviceEventListener = () => {
	const listener = telldus.addDeviceEventListener(function(deviceId, status) {
		console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);

		const device = sensorHandler.getDevice(deviceId);
		if (device == types.UNKNOWN) {
			console.log('Dropping device event. deviceId ', deviceId);	
			return;
		}

		const event = {
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
		processEvent(event);
	});
	return listener;
};

const testDeviceEventListener = (deviceId, status) => {
	console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
	
	const device = sensorHandler.getDevice(deviceId);
	if (device == types.UNKNOWN) {
		console.log('Dropping device event. deviceId ', deviceId);	
		return;
	}

	const event = {
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
	processEvent(event);
};

const init = () => {
	const sensorListener = addSensorEventListener();
	const deviceListener = addDeviceEventListener();
	//testDeviceEventListener(11, {name: types.Status.ON})
	//testDeviceEventListener(11, {name: types.Status.OFF})
};

init();