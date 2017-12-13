const types = require('../common/types');
const notify = require('../server/notify');
const limits = require('../common/limits');
const mongodb = require('../server/mongodb');
const telldusDeviceHandler = require('../server/telldusDeviceHandler');
const websocket = require('../server/websocket');

const getLowerLimit = (event) => {
	return limits.getLowerLimit(event.measure.type, event.sensor.id);
};

const getUpperLimit = (event) => {
	return limits.getUpperLimit(event.measure.type, event.sensor.id);
};

const resolveOnOff = (resolve) => {
	resolve(types.Severity.ALARM);
	mongodb.findPresenceStatus().then((prescence) => {
		if (prescence === types.PresenceStatus.AWAY) {
			resolve(types.Severity.ALARM);
		} else {
			resolve(types.Severity.INFO);	
		}
	})
	.catch((err) => {
		console.log('Unable to get status of prescence. Returning severity ALARM.');
		resolve(types.Severity.INFO); //Todo: change when stable
	});
};

const resolveTempHumidity = (resolve, event) => {
	const upperLimit = getUpperLimit(event);
	const lowerLimit = getLowerLimit(event);
	const value = event.measure.value;
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

const processEvent = (event, websocket) => {
	getSeverity(event).then((severity) => {
		event.severity = severity;
		//1. Trigger and notify
		if (event.severity >= types.Severity.ALARM) {
			telldusDeviceHandler.triggerDevices(event.sensor, event.measure.value);
			notify(event.severity, event.sensor, `Sensor ${event.sensor.name} has a ${event.measure.type} of ${event.measure.value}`, event.moment);
		}

		//2. Update client
		websocket.updateClients(event);

		//3. Store in Mongo
		switch (event.measure.type) {
			case types.MeasureType.ON_OFF:
				mongodb.insertDeviceAction(event)
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