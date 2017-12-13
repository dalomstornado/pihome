const {Enum}  = require('enumify');

class Severity extends Enum {}
Severity.initEnum(['INFO', 'WARNING', 'ALARM']);

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

const Status = {
	ON: 'ON',
	OFF: 'OFF'
}

const UNKNOWN = 'UNKNOWN';
const NORESULT = 'NORESULT';
const TIMESTAMPTYPE = 'X'

module.exports = { MeasureType, DeviceType, PresenceStatus, Severity, Status, UNKNOWN, NORESULT, TIMESTAMPTYPE };