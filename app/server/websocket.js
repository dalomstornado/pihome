const types = require('../common/types');

module.exports = (io) => {
	const module = {}; 

	module.updateClients = (event) => {
		let deviceType = null;
		switch (event.measure.type) {
			case types.MeasureType.TEMPERATURE:
				deviceType = types.DeviceType.TEMP_HUMIDITY;
				break;
			case types.MeasureType.HUMIDITY:
				deviceType = types.DeviceType.TEMP_HUMIDITY;
				break;
			case types.MeasureType.ON_OFF:
				deviceType = types.DeviceType.ON_OFF;
				break;
		}

		if (deviceType) {
			io.emit(deviceType, event);
		} else {
			console.log('Unhandled device type. Dropping to emit on websocket.');	
		}		
	};

	return module;
};