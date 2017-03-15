const MeasureType = {
	TEMPERATURE: 'TEMPERATURE',
	HUMIDITY: 'HUMIDITY',
	ON_OFF: 'ON_OFF',
	UNKNOWN: 'UNKNOWN'
};

const DeviceType = {
	TEMP_HUMIDITY: 'TEMP_HUMIDITY',
	ON_OFF: 'ON_OFF',
	TEMP_HUMIDITY_REFERENCE: 'TEMP_HUMIDITY_REFERENCE',
	UNKNOWN: 'UNKNOWN'
};

const PresenceStatus = {
	HOME: 'HOME',
	AWAY: 'AWAY'
};

const Severity = {
	INFO: 0,
	WARNING: 1,
	ALARM: 2
};

const Status = {
	ON: 'ON',
	OFF: 'OFF'
}

const UNKNOWN = 'UNKNOWN';

module.exports = { MeasureType, DeviceType, PresenceStatus, Severity, Status, UNKNOWN };