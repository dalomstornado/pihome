const devices = require('./devices.json');
const types = require('./types.js');

const getDevice = (id) => {
	const device = devices.find((device) => {
		return device.id === id 
			&& device.type === types.DeviceType.ON_OFF; 
	});
	if (device) {
		return device;	
	}
	return types.UNKNOWN;
};

const getSensor = (id) => {
	const sensor = devices.find((device) => {
		return device.id === id
			&& device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	if (sensor) {
		return sensor;	
	}
	return types.UNKNOWN;
};

const getGaugeIdTemp = (sensor) => {
	return sensor.id + types.MeasureType.TEMPERATURE;
};

const getGaugeIdHumidity = (sensor) => {
	return sensor.id + types.MeasureType.HUMIDITY;
};

const getLineChartIdTemp = () => {
	return 'lineChart_' + types.MeasureType.TEMPERATURE;
};

const getLineChartIdHumidity = () => {
	return 'lineChart_' + types.MeasureType.HUMIDITY;
};

const getDevices = () => {
	const devices = devices.filter((device) => {
		return device.type === types.DeviceType.ON_OFF; 
	});
	return devices;
};

const getSensors = () => {
	const sensors = devices.filter((device) => {
		return device.type === types.DeviceType.TEMP_HUMIDITY; 
	});
	return sensors
};

const getAll = () => {
	return devices;
};

const createEvent = (id) => {
	//todo: can be both device or sensor event.

	return {
		moment: moment(),
			sensor: {
				id: device.id,
				name: device.name,
				triggers: device.triggers
			},
			measure: {
				type: types.MeasureType.ON_OFF,
				value: status.name
			},
	};	
};

module.exports = { getDevice, getSensor, getGaugeIdTemp, getGaugeIdHumidity, getLineChartIdTemp, getLineChartIdHumidity, getDevices, getSensors, getAll, createEvent };