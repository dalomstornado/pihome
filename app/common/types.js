const MeasureType = {
	TEMPERATURE: 'temp',
	HUMIDITY: 'humidity',
	ON_OFF: 'on_off'
};

const SensorType = {
	TEMP_HUMIDITY: 'temp_humidity',
	ON_OFF: 'on_off',
	TEMP_HUMIDITY_REFERENCE: 'temp_humidity_reference',
};

const PresenceStatus = {
	HOME: 'home',
	AWAY: 'away'
}



module.exports = { MeasureType, SensorType, PresenceStatus };