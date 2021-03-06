const mongodb = require('../server/mongodb');
const types = require('../common/types');
const moment = require('moment');

const returnData = (req, res, promiseFunction) => {
	promiseFunction.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		console.log("ERROR", err)
		res.sendStatus(400);
	});
};

const temperature = (req, res) => {
	returnData(req, res, mongodb.findTemperature(parseInt(req.params.sensorId)));
};

const temperatures = (req, res) => {
	const from = moment(req.params.from, types.TIMESTAMPTYPE)
	returnData(req, res, mongodb.findTemperaturesAggregate(parseInt(req.params.sensorId), from));
};

const humidity = (req, res) => {
	returnData(req, res, mongodb.findHumidity(parseInt(req.params.sensorId)));
};

const humidities = (req, res) => {
	const from = moment(req.params.from, types.TIMESTAMPTYPE)
	returnData(req, res, mongodb.findHumiditiesAggregate(parseInt(req.params.sensorId), from));
};

module.exports = { temperature, temperatures, humidity, humidities };