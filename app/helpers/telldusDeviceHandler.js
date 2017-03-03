const telldus = require('telldus');
const types = require('../common/types');

const triggerDevices = (deviceIds, status) => {
	for(let i = 0; i < deviceIds.length; i++) {
		switch (status) {
			case types.Status.ON:
				telldus.turnOn(deviceIds[i], (err) => {
					console.log('Device ' + deviceIds[i] + ' is now ON')
				});
				break;
			case types.Status.OFF:
				telldus.turnOff(deviceIds[i], (err) => {
					console.log('Device ' + deviceIds[i] + ' is now OFF')
				});
				break;
		}
	}
};

module.exports = triggerDevices;