const types = require('../common/types');
const notify = require('../helpers/notify');
const limits = require('../common/limits');
const mongodb = require('../helpers/mongodb');

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

const resolveOnOff = (resolve) => {
	console.log('in on off');
	mongodb.findPresenceStatus().then((prescence) => {
		if (prescence === types.PresenceStatus.AWAY) {
			resolve(types.Severity.ALARM);
		} else {
			resolve(types.Severity.INFO);	
		}
	})
	.catch((err) => {
		console.log('Unable to get status of prescence. Returning severity ALARM.');
		resolve(types.Severity.ALARM);
	});
};

const resolveTempHumidity = (resolve, event) => {
	const upperLimit = getUpperLimit(event);
	const lowerLimit = getLowerLimit(event);
	const value = event.value;
	if((upperLimit.ALARM && value >= upperLimit.ALARM)
		|| (lowerLimit.ALARM && value <= lowerLimit.ALARM)) {
			resolve(types.Severity.ALARM);
	} else if ((upperLimit.WARNING && value >= upperLimit.WARNING)
		|| (lowerLimit.WARNING && value <= lowerLimit.WARNING)) {
			resolve(types.Severity.WARNING);
	} else {		
		resolve(types.Severity.INFO);
	}
};

const getSeverity = (event) => {
	const type = types.MeasureType[event.measure.type];
	const value = event.measure.value;
	
	return new Promise((resolve, reject) => {
		if (type === types.MeasureType.ON_OFF) {
			resolveOnOff(resolve);
		} else if (type === types.MeasureType.TEMPERATURE 
			|| type === types.MeasureType.HUMIDITY) {
				resolveTempHumidity(resolve, event);
		}
	});
};

const processEvent = (event) => {
	getSeverity(event).then((severity) => {
		event.severity = severity;

		if (severity >= types.Severity.ALARM) {
			notify(event.severity, `Sensor ${event.sensorName} has a ${event.measureType} of ${event.value}`);
		}
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
	}).catch((err) => {
		console.log('ERROR', err);
	});
};

module.exports = processEvent;