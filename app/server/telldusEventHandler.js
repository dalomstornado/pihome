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

	const callProcessEvent = (event) => {
		if (event !== types.UNKNOWN) {
  			processEvent(event, websocket);
  		} else {
			console.log('Dropping event. Unknown sensor/device: ', event.sensor.id);	 
 		}
	};

	const doSensorEventListener = (deviceId, protocol, model, type, value, timestamp) => {
		console.log('New sensor event received: ', deviceId, protocol, model, type, value, timestamp);
  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), moment.utc(timestamp, 'x'));
  		callProcessEvent(event);
	}; 

	const doDeviceEventListener = (deviceId, status) => {
		console.log('New device event recieved: ' + deviceId + ' is now ' + status.name);
		const event = deviceHandler.createEvent(deviceId, types.MeasureType.ON_OFF, status.name)
		callProcessEvent(event)
	};

	const addSensorEventListener = () => {
		const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
			doSensorEventListener(deviceId, protocol, model, type, value, timestamp);	
		});
		return listener;
	};

	const addDeviceEventListener = () => {
		const listener = telldus.addDeviceEventListener((deviceId, status) => {
			doDeviceEventListener(deviceId, status)
		});
		return listener;
	};

	//TEST START
	const getHumidityValue = () => {
		return 35 + Math.floor(Math.random() * 60)
	};

	const getTempValue = () => {
		return -35 + Math.floor(Math.random() * 70)
	};

	const getLatency = () => {
		return 25000;
		return Math.floor(Math.random() * 1000);
	}

	const getUpdateInterval = () => {
		return 5000 + Math.round(15000 * Math.random());
	};

	const testTimeStamp = () => {
		return 1490600000000 + Math.round(509357 * Math.random());
	};


	const test = () => {
		const sensors = [135, 136, 137, 138];

		for(let i = 0; i < 4; i++){	
			setInterval(() => {
				doSensorEventListener(sensors[i], '', '', 1, getTempValue(), testTimeStamp());
			  	setTimeout(() => {
					doSensorEventListener(sensors[i], '', '', 2, getHumidityValue(), testTimeStamp());
				}, getLatency());
			}, getUpdateInterval());	
		}
	};
	//TEST END

	module.init = () => {
		const sensorListener = addSensorEventListener();
		const deviceListener = addDeviceEventListener();

		//test();
	};

	return module;
};