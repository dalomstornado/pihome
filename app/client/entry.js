const gauge = require('./gauge');
const page = require('./page');
const lineChart = require('./lineChart');
const deviceHandler = require('../common/deviceHandler');

window.app = {
	gauge,
	page,
	lineChart,
	deviceHandler
};