const types = require('../common/types');
const notify = require('../helpers/notify');
const limits = require('../common/limits');

const addEvent = (event) => {
	var severity = getSeverity(event);
	if (severity >= types.Severity.ALARM) {
		notify(`Sensor ${event.sensorName} has a ${event.measureType} of ${event.reading}`, severity);
	}
};

const getSeverity = (event) => {
	const type = types.MeasureType[event.measureType];
	const reading = event.reading;

	const upperLimit = limits.UpperLimit[type];
	const lowerLimit = limits.LowerLimit[type];
	if((upperLimit.ALARM && reading >= upperLimit.ALARM)
		|| (lowerLimit.ALARM && reading <= lowerLimit.ALARM)) {
			return types.Severity.ALARM;
	}
	if((upperLimit.WARNING && reading >= upperLimit.WARNING)
		|| (lowerLimit.WARNING && reading <= lowerLimit.WARNING)) {
			return types.Severity.WARNING;
	}
	return -1;
};

module.export = { addEvent }