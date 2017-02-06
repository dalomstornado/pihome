const types = require('../common/types');
const notify = require('../helpers/notify');
const limits = require('../common/limits');
const mongodb = require('../helpers/mongodb');

const processEvent = (event) => {
	var severity = getSeverity(event); //TODO promise från getSeverity...
	if (severity >= types.Severity.ALARM) {
		notify(severity, `Sensor ${event.sensorName} has a ${event.measureType} of ${event.reading}`);
	}
	switch (event.measureType) {
		case types.MeasureType.ON_OFF:
		//insert to door log
		break;
		case types.MeasureType.TEMPERATURE:
		break;
		case types.MeasureType.HUMIDITY:
		break;
	}
};

const getSeverity = (event) => {
	const type = types.MeasureType[event.measureType];
	const reading = event.reading;
	
	const prescence = mongodb.findPresenceStatus().then(() => {
		if (type === types.MeasureType.ON_OFF && prescence === types.PresenceStatus.AWAY) {
			return types.Severity.ALARM;
		} else if (type === types.MeasureType.TEMPERATURE || type === types.MeasureType.HUMIDITY) {
			const upperLimit = limits.UpperLimit[type];
			const lowerLimit = limits.LowerLimit[type];
			console.log(lowerLimit.ALARM);
			if((upperLimit.ALARM && reading >= upperLimit.ALARM)
				|| (lowerLimit.ALARM && reading <= lowerLimit.ALARM)) {
					return types.Severity.ALARM;
			}
			if((upperLimit.WARNING && reading >= upperLimit.WARNING)
				|| (lowerLimit.WARNING && reading <= lowerLimit.WARNING)) {
					return types.Severity.WARNING;
			}
		}
		return -1;
	});
};

processEvent({sensorName: 'Test sensor', measureType: 'TEMPERATURE', reading: -20});

module.export = processEvent
