const page = require('./page');
const websocket = require('./websocket');
const gauge = require('./gauge');
const lineChart = require('./lineChart');

window.app = {
	page,
	gauge,
	lineChart
};