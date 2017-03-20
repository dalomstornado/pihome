const types = require('../common/types');
const deviceHandler = require('../common/deviceHandler');
const gauge = require('./gauge');

const socket = io.connect();

socket.on('connect', () => {
	console.log('Socket connected!');
});

socket.on(types.DeviceType.TEMP_HUMIDITY, (event) => {
	const gaugeDevice = deviceHandler.getGauge(event.sensor, event.measure.type);
	gauge.drawGauge(gaugeDevice, event.measure.value);
	console.log('Gauge updated');
});
