const types = require('../common/types');
const processEvent = require('../helpers/processEvent');
//var telldus = require('telldus');

const test = () => {
	const event = { 
		date: new Date(),
		sensor: {
			id: 'sensor1',
			name: 'Sensor 1'
		},
		measure: {
			type: types.MeasureType.HUMIDITY,
			reading: 95 
		}
	 };
	 processEvent(event);
};

//test();