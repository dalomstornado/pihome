const page = require('./page');
const websocket = require('./websocket');
const gauge = require('./gauge');
const lineChart = require('./lineChart');
const device = require('./device');

window.app = {
	page,
	gauge,
	lineChart,
	device
};