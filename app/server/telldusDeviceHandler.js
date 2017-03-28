const telldus = require('telldus');
const types = require('../common/types');
const mongodb = require('../server/mongodb');
const deviceHandler = require('../common/deviceHandler');
const moment = require('moment');

const triggerDevices = (sensor, status) => {
	if (!sensor.triggers) {
		return;
	}
	
	for(let i = 0; i < sensor.triggers.length; i++) {
	const device = deviceHandler.getSensorOrDevice(sensor.triggers[i]);
	const event = deviceHandler.createEvent(device.id, types.MeasureType.ON_OFF, status.name);

	switch (status) {
		case types.Status.ON:
			telldus.turnOn(device.id, (err) => {
				mongodb.insertDeviceAction(event);
				console.log(sensor.name + ' triggers ' + device.name + ' ON'); //Rolling tid. Vs wrappa console.log
			});
			break;
		case types.Status.OFF:
			telldus.turnOff(deviceIds[i], (err) => {
				mongodb.insertDeviceAction(event);
				console.log(sensor.name + ' triggers ' + device.name + ' OFF');
			});
			break;
		}
	}
};

module.exports = triggerDevices;