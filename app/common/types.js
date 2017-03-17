const MeasureType = {
	TEMPERATURE: 'TEMPERATURE',
	HUMIDITY: 'HUMIDITY',
	ON_OFF: 'ON_OFF'
};

const DeviceType = {
	TEMP_HUMIDITY: 'TEMP_HUMIDITY',
	ON_OFF: 'ON_OFF'
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