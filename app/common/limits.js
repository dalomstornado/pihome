const LowerLimit = {
	TEMPERATURE: { WARNING: 7, ALARM: 3 },
	HUMIDITY: { WARNING: undefined, ALARM: undefined }
};
const UpperLimit = {
	TEMPERATURE: { WARNING: undefined, ALARM: 40 },
	HUMIDITY: { WARNING: 70, ALARM: 85 }
};

module.exports = { LowerLimit, UpperLimit };