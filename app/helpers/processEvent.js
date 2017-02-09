const types = require('../common/types');
const notify = require('../helpers/notify');
const limits = require('../common/limits');
const mongodb = require('../helpers/mongodb');

const processEvent = (event) => {
	var severity = getSeverity(event).then((severity) => {
		if (severity >= types.Severity.ALARM) {
			notify(severity, `Sensor ${event.sensorName} has a ${event.measureType} of ${event.reading}`);
		}

		event.severity = severity;
		switch (event.measure.type) {
			case types.MeasureType.ON_OFF:
				break;
			case types.MeasureType.TEMPERATURE:
				mongodb.insertTemperature(event);
				break;
			case types.MeasureType.HUMIDITY:
				mongodb.insertHumidity(event);
				break;
		}
	});
};

const getLowerLimit = (event) => {
	const type = types.MeasureType[event.measure.type];
	const sensorSpecific = limits.LowerLimit[event.sensor.id];
	if (sensorSpecific){
		return sensorSpecific[type];
	}
	return limits.LowerLimit[type];
};

const getUpperLimit = (event) => {
	const type = types.MeasureType[event.measure.type];
	const sensorSpecific = limits.UpperLimit[event.sensor.id];
	if (sensorSpecific){
		return sensorSpecific[type];
	}
	return limits.UpperLimit[type];
};

const getSeverity = (event) => {
	const type = types.MeasureType[event.measure.type];
	const reading = event.measure.reading;
	
	return new Promise((resolve, reject) => {
		if (type === types.MeasureType.ON_OFF){
			return mongodb.findPresenceStatus().then((prescence) => {
				if (prescence === types.PresenceStatus.AWAY) {
					resolve(types.Severity.ALARM);
				}
				resolve(types.Severity.INFO);
			})
			.catch((err) => {
				console.log('Unable to get status of prescence. Returning severity ALARM.');
				resolve(types.Severity.ALARM);
			});
		} else if (type === types.MeasureType.TEMPERATURE || type === types.MeasureType.HUMIDITY) {
			const upperLimit = getUpperLimit(event);
			const lowerLimit = getLowerLimit(event);
			if((upperLimit.ALARM && reading >= upperLimit.ALARM)
				|| (lowerLimit.ALARM && reading <= lowerLimit.ALARM)) {
					resolve(types.Severity.ALARM);
			}
			if((upperLimit.WARNING && reading >= upperLimit.WARNING)
				|| (lowerLimit.WARNING && reading <= lowerLimit.WARNING)) {
					resolve(types.Severity.WARNING);
			}
		}
		resolve(types.Severity.INFO);
	});
};

module.exports = processEvent;