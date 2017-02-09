const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
const config = require('../models/config.json');
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

/*
const test = (deviceId,protocol,model,type,value,timestamp) => {
	const event = {
		date: timestamp,
		sensor: {
			id: deviceId,
			name: getSensorName(deviceId)
		},
		measure: {
			type: getMeasureType(type),
			value
		}
	};
	console.log(event);
	 //processEvent(event);
};
*/

const init = () => {
	const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
  		console.log('New sensor event received: ',deviceId,protocol,model,type,value,timestamp);
  		const event = {
  			date: new Date(),
  			sensor: {
  				id: deviceId,
  				name: getSensorName(deviceId)
  			},
  			measure: {
  				type: getMeasureType(type),
				value: Number.parseFloat(value)
  			}
  		};
  		if (event.sensor.id !== UNKNOWN && event.measure.type !== UNKNOWN) {
  			processEvent(event);
			console.log('done processing');	
  		} else {
  			console.log('Dropping event ' + event);	
  		}
	});
};

init();
//test('sensor1', 'proto', 'model', 'TMP', 10, new Date());