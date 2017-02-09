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

const resolveTempHumidity = (event, resolve) => {
	console.log('in temp/humid')
	const upperLimit = getUpperLimit(event);
	const lowerLimit = getLowerLimit(event);
	if((upperLimit.ALARM && value >= upperLimit.ALARM)
		|| (lowerLimit.ALARM && value <= lowerLimit.ALARM)) {
			console.log('about to resolve alarm')
			resolve(types.Severity.ALARM);
	} else if ((upperLimit.WARNING && value >= upperLimit.WARNING)
		|| (lowerLimit.WARNING && value <= lowerLimit.WARNING)) {
			console.log('about to resolve warning');
			resolve(types.Severity.WARNING);
	} else {
		console.log('about to resolve info');
		resolve(1);
	}
};

const getSeverity = (event) => {
	const type = types.MeasureType[event.measure.type];
	const value = event.measure.value;
	
	return new Promise((resolve, reject) => {
		if (type === types.MeasureType.ON_OFF) {
			resolveOnOff(undefined);
		} else if (type === types.MeasureType.TEMPERATURE 
			|| type === types.MeasureType.HUMIDITY) {
				return Promise.resolve(1);
				resolveTempHumidity(resolve);
		}
	});
};

const processEvent = (event) => {
	console.log('value: ' + typeof(event.measure.value));
	console.log('processing event');
	severity = 1;
	//getSeverity(event).then((severity) => {
		console.log('get severity done');
		if (severity >= types.Severity.ALARM) {
			notify(severity, `Sensor ${event.sensorName} has a ${event.measureType} of ${event.value}`);
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
	//});
};

module.exports = processEvent;