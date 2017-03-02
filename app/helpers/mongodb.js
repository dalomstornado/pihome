const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const types = require('../common/types');

const url = 'mongodb://localhost:27017/pihome';
const date = 'date';

const insertTemperature = (event) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('temperature')
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, sensorName: event.sensor.name, severity: event.severity, value: event.measure.value }
			collection.insert(doc).then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log("ERROR", err)
				reject(err);
			});
			db.close();
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const insertHumidity = (event) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('humidity')
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, sensorName: event.sensor.name, severity: event.severity, value: event.measure.value }
			collection.insert(doc).then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log("ERROR", err)
				reject(err);
			});
			db.close();
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const insertDeviceAction = (event) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('device')
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, sensorName: event.sensor.name, severity: event.severity, value: event.measure.value }
			collection.insert(doc).then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log("ERROR", err)
				reject(err);
			});
			db.close();
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const insertPresenceStatus = (status) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('presence')
			var doc = { date: new Date(), status }
			collection.insert(doc).then((result) => {
				resolve(result);
			})
			.catch((err) => {
				console.log("ERROR", err)
				reject(err);
			});
			db.close();
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const findPresenceStatus = () => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('presence')
			collection.find().sort({ date: -1 }).limit(1).toArray((err, items) => {
				if (err) {
					reject(err);
				} else {
					let presenceStatus = types.PresenceStatus[items[0].status];	
					resolve(presenceStatus);
				}
				db.close();
			});
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const findHumidity = (top) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('humidity')
			collection.find().sort({ date: -1 }).limit(top).toArray((err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
				}
				db.close();
			});
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};

const findTemperature = (top) => { //fromDate, sensorId
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('temperature')
			collection.find().sort({ date: -1 }).limit(top).toArray((err, items) => {
				if (err) {
					reject(err);
				} else {
					resolve(items);
				}
				db.close();
			});
		})		
		.catch((err) => {
			console.log("ERROR", err)
			reject(err);
		});
	});
};
/*
findTemperature(10).then((items) => {
	console.log(items);
});
*/

module.exports = { insertPresenceStatus, findPresenceStatus, insertHumidity, insertTemperature, findHumidity, findTemperature };