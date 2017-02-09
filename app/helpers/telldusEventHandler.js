const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
const telldus = require('telldus');
var config = require('../models/config.json');

const getSensorName = (deviceId) => {
	const sensor = config.sensors.find((sensor) => {
		return sensor.id === deviceId; 
	});
	return sensor.name;
};

const getMeasureType = (type) => {
	switch (type) {
		case 'TMP':
			return types.MeasureType.TEMPERATURE;
		case 'HUM':
			return types.MeasureType.HUMIDITY;
	}
};

const test = (deviceId,protocol,model,type,value,timestamp) => {
	const event = {
		date: timestamp,
		sensor: {
			id: deviceId,
			name: getSensorName(deviceId)
		},
		measure: {
			type: getMeasureType(type),
			reading: value
		}
	};
	 processEvent(event);
};

const init = () => {
	const listener = telldus.addSensorEventListener((deviceId, protocol, model, type, value, timestamp) => {
  		console.log('New sensor event received: ',deviceId,protocol,model,type,value,timestamp);
  		const event = {
  			date: timestamp,
  			sensor: {
  				id: deviceId,
  				name: getSensorName(deviceId)
  			},
  			measure: {
  				type: getMeasureType(type),
  				reading: value
  			}
  		};
  		processEvent(event);
	});
};

//init();
test('sensor1', 'proto', 'model', 'TMP', 10, new Date());