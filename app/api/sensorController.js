const mongodb = require('../server/mongodb');
const types = require('../common/types');

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
	returnData(req, res, mongodb.findTemperature(req.params.sensorId));
};

const temperatures = (req, res) => {
	returnData(req, res, mongodb.findTemperatures(req.params.sensorId, new Date(req.params.from)));
};

const humidity = (req, res) => {
	returnData(req, res, mongodb.findHumidity(req.params.sensorId));
};

const humidities = (req, res) => {
	returnData(req, res, mongodb.findHumidities(req.params.sensorId, new Date(req.params.from)));
};

module.exports = { temperature, temperatures, humidity, humidities };