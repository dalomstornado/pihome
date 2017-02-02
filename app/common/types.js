const MeasureType = {
	TEMPERATURE: 'TEMPERATURE',
	HUMIDITY: 'HUMIDITY',
	ON_OFF: 'ON_OFF'
};

const SensorType = {
	TEMP_HUMIDITY: 'TEMP_HUMIDITY',
	ON_OFF: 'ON_OFF',
	TEMP_HUMIDITY_REFERENCE: 'TEMP_HUMIDITY_REFERENCE',
};

const PresenceStatus = {
	HOME: 'HOME',
	AWAY: 'AWAY'
};

const Severity = {
	INFO: 'INFO',
	WARNING: 'WARNING',
	ALARM: 'ALARM'
};



module.exports = { MeasureType, SensorType, PresenceStatus, Severity };