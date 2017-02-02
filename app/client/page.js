import { drawGauge } from './gauge'; //es6 -> require och export.module

const updateGauge = (gauge) => {
	const valueHumidity = 35 + Math.round(65 * Math.random());
	const valueTemp = - 10 + Math.round(40 * Math.random());
	if (gauge.type == 'temp'){
		drawGauge(gauge, valueTemp);	
	} else {
		drawGauge(gauge, valueHumidity);
	}
};

const init = (sensors) => {
	for(let sensor of sensors){
		for(let gauge of sensor.gauges) {
			setInterval(() => {
				updateGauge(gauge);
			}, 3000 + Math.round(10000 * Math.random()));
		};
	};
};

export { init };