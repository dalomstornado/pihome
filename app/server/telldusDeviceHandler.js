const telldus = require('../server/telldusFake');
const types = require('../common/types');
const mongodb = require('../server/mongodb');
const deviceHandler = require('../common/deviceHandler');
const moment = require('moment');

const triggerDevices = (event) => {
	if (!event.sensor.triggers) {
		return;
	}
	
	for(let i = 0; i < event.sensor.triggers.length; i++) {
		const newEvent = deviceHandler.createEventByEvent(event);
		newEvent.sensor = deviceHandler.getSensorOrDevice(event.sensor.triggers[i]);
		
		switch (event.status) {
			case types.Status.ON:
				telldus.turnOn(device.id, (err) => {
					if (!err) {
						mongodb.insertDeviceAction(newEvent);
						console.log(event.sensor.name + ' triggers ' + newEvent.sensor.name + ' ON');	
					} else {
						console.log('telldus.turnOn reports error: ' + err);
					}
				});
				break;
			case types.Status.OFF:
				telldus.turnOff(event.device.id, (err) => {
					if (!err) {
						mongodb.insertDeviceAction(newEvent);
						console.log(event.sensor.name + ' triggers ' + newEvent.device.name + ' OFF');	
					} else {
						console.log('telldus.turnOff reports error: ' + err);
					}
				});
				break;
		}
	}
};

const getDeviceEntries = (renderDoors, req, res) => {
	mongodb.findPresenceStatus().then((presenceStatus) => {
		mongodb.findDevicesEntries().then((deviceEntries) => {
			for (let i = 0; i < deviceEntries.length; i++) {
				//TODO: Maybe move this since it is view specific.
	        	deviceEntries[i].date = moment(deviceEntries[i].date).format('YYYY-MM-DD HH:mm:ss'); 
	        	deviceEntries[i].sensor = deviceHandler.getSensorOrDevice(deviceEntries[i].sensorId);
	        	//TODO: Reverse lookup severity
	        	deviceEntries[i].severity = deviceEntries[i].severity.name;
	        	deviceEntries[i].value = types.Status[deviceEntries[i].value];
	      	}
	      	renderDoors(req, res, deviceEntries, presenceStatus);
		});
	});
};

module.exports = { triggerDevices, getDeviceEntries };