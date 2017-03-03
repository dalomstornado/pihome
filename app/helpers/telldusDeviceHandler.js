const telldus = require('telldus');
const types = require('../common/types');
const mongodb = require('../helpers/mongodb');
const sensorHandler = require('../helpers/sensorHandler');

const triggerDevices = (deviceIds, status) => {
	for(let i = 0; i < deviceIds.length; i++) {

		const device = sensorHandler.getDevice(deviceIds[i]);
		const event = {
			moment: moment(),
			sensor: {
				id: device.id,
				name: device.name,
			},
			measure: {
				type: types.MeasureType.ON_OFF,
				value: status.name
			},
		};

		switch (status) {
			case types.Status.ON:
				telldus.turnOn(deviceIds[i], (err) => {
					mongodb.insertDeviceAction(event);
					console.log('Device ' + deviceIds[i] + ' is now ON')
				});
				break;
			case types.Status.OFF:
				telldus.turnOff(deviceIds[i], (err) => {
					mongodb.insertDeviceAction(event);
					console.log('Device ' + deviceIds[i] + ' is now OFF')
				});
				break;
		}
	}
};

module.exports = triggerDevices;