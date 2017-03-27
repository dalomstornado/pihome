const gauge = require('./gauge');
const page = require('./page');
const lineChart = require('./lineChart');
const deviceHandler = require('../common/deviceHandler');
const websocket = require('./websocket');

window.app = {
	gauge,
	page,
	deviceHandler,
	websocket
};