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
			console.log('Dropping event. Unknown sensor/device. Event: ', event);	 
 		}
	};

	const doSensorEventListener = (deviceId, protocol, model, type, value, timestamp) => {
		const m = moment(timestamp, types.TIMESTAMPTYPE);
		console.log(`Sensor event: device ${deviceId} ${type} ${value}. ${m.toDate()}`);
		
  		const event = deviceHandler.createEvent(deviceId, getMeasureType(type), Number.parseFloat(value), m);
  		callProcessEvent(event);
	}; 

	const doDeviceEventListener = (deviceId, status) => {
		console.log('Device event: ' + deviceId + ' is now ' + status.name);
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
		return Math.floor(Math.random() * 1000);
	}

	const getUpdateInterval = () => {
		return 2000 + Math.round(5000 * Math.random());
	};

	const testTimeStamp = () => {
		return moment().subtract(Math.round(Math.random() * 10 * 24), 'h').unix(); 
	};


	const test = () => {
		const sensors = [151, 167, 183, 135];
		for(let i = 0; i < 4; i++){	
			setInterval(() => {
				doSensorEventListener(sensors[i], '', '', 1, getTempValue(), testTimeStamp());
			  	setTimeout(() => {
					doSensorEventListener(sensors[i], '', '', 2, getHumidityValue(), testTimeStamp());
				}, getLatency());
			}, getUpdateInterval());	
		}
	};

	const testOnOff = () => {
		const sensors = [23417874, 23421126];
		doDeviceEventListener(sensors[0], {name: types.Status.ON});
		doDeviceEventListener(sensors[0], {name: types.Status.OFF});
		doDeviceEventListener(sensors[0], {name: types.Status.ON});
	};
	//TEST END

	module.init = () => {
		const sensorListener = addSensorEventListener();
		const deviceListener = addDeviceEventListener();
		testOnOff();
	};

	return module;
};