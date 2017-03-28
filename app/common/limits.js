//TODO: Make this use types
const LowerLimit = {
	TEMPERATURE: { WARNING: 7, ALARM: 4 },
	HUMIDITY: { WARNING: undefined, ALARM: undefined }, 
	135: {
		TEMPERATURE: { WARNING: -10, ALARM: -20 },
		HUMIDITY: { WARNING: undefined, ALARM: undefined } 
	}
};
const UpperLimit = {
	TEMPERATURE: { WARNING: 30, ALARM: 35 },
	HUMIDITY: { WARNING: 65, ALARM: 75 },
	135: {
		TEMPERATURE: { WARNING: undefined, ALARM: undefined },
		HUMIDITY: { WARNING: 90, ALARM: 93 } 
	}
};

const getLimit = (limit, measureType, sensorId = undefined) => {
	if (sensorId) {
		let specificValue = limit[sensorId];
		if (specificValue) {
			return specificValue[measureType];
		}
	}
	return limit[measureType];
}

const getLowerLimit = (measureType, sensorId = undefined) => {
	return getLimit(LowerLimit, measureType, sensorId);
}

const getUpperLimit = (measureType, sensorId = undefined) => {
	return getLimit(UpperLimit, measureType, sensorId);
}

module.exports = { getLowerLimit, getUpperLimit };