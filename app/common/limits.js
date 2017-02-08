const LowerLimit = {
	TEMPERATURE: { WARNING: 7, ALARM: 4 },
	HUMIDITY: { WARNING: undefined, ALARM: undefined }, 
	sensor1: {
		TEMPERATURE: { WARNING: 0, ALARM: -10 },
		HUMIDITY: { WARNING: undefined, ALARM: undefined } 
	}
};
const UpperLimit = {
	TEMPERATURE: { WARNING: undefined, ALARM: 40 },
	HUMIDITY: { WARNING: 70, ALARM: 80 }
};

module.exports = { LowerLimit, UpperLimit };