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
			console.log('event', event);
			console.log('deviceType', deviceType);	
			io.emit(deviceType, event);
			console.log('Updated client');	
		} else {
			console.log('Unhandled device type. No emit');	
		}		
	};

	return module;
};