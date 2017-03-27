const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const types = require('../common/types');

const url = 'mongodb://localhost:27017/pihome';
const date = 'date';

const insertTemperature = (event) => { //TODO: Remove name from storing... (deviceHandler owns it)
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('temperature')
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, severity: event.severity, value: event.measure.value }
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
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, severity: event.severity, value: event.measure.value }
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
			var doc = { date: event.moment.toDate(), sensorId: event.sensor.id, severity: event.severity, value: event.measure.value }
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
					if (items.length > 0) {
						let presenceStatus = types.PresenceStatus[items[0].status];	
						resolve(presenceStatus);
					} else {
						reject(types.NORESULT);
					}
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

const findTemperature = (sensorId) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('temperature')
			sensorId = parseInt(sensorId);
			collection.find({ sensorId }, { date: 1, value: 1, _id: 0 }).sort({ date: -1 }).limit(1).toArray((err, items) => {
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

//TEST START
const testTemp = () => {
	return [{ date: new Date('2017-03-20'), value: -10 + Math.round(30 * Math.random()) }, { date: new Date('2017-03-25'), value: 15 }];
};

const testHumidity = () => {
	return [{ date: new Date('2017-03-20'), value: 10 + Math.round(85 * Math.random()) }, { date: new Date('2017-03-25'), value: 15 }];
};
//TEST END

const findTemperatures = (sensorId, from) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('temperature')
			sensorId = parseInt(sensorId);
			collection.find({ sensorId, date: { $gt: from }}, { date: 1, value: 1, _id: 0 }).sort({ date: -1 }).toArray((err, items) => {
				if (err) {
					reject(err);
				} else {
					//console.log('temp ' + sensorId + items);
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

const findHumidity = (sensorId) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('humidity')
			sensorId = parseInt(sensorId);
			collection.find({sensorId}, { date: 1, value: 1, _id: 0 }).sort({ date: -1 }).limit(1).toArray((err, items) => {
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

const findHumidities = (sensorId, from) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url).then((db) => {
			let collection = db.collection('humidity')
			sensorId = parseInt(sensorId);
			collection.find({ sensorId, date: { $gt: from }}, { date: 1, value: 1, _id: 0 }).sort({ date: -1 }).toArray((err, items) => {
				if (err) {
					reject(err);
				} else {
					//console.log('hum ' + sensorId + items);
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

const init = () => {
	console.log('MongoDB init run');
	mongoClient.connect(url).then((db) => {
		const cappedSize = 209715200
		db.createCollection('temperature', { 'capped': true, 'size': cappedSize });
		db.createCollection('humidity', { 'capped': true, 'size': cappedSize });
		db.createCollection('device', { 'capped': true, 'size': cappedSize });
		db.createCollection('presence', { 'capped': true, 'size': cappedSize });
		findPresenceStatus().catch((err) => {
			if (err === types.NORESULT) {
				insertPresenceStatus(types.PresenceStatus.HOME);
				console.log('Inserted status HOME since findPresenceStatus returns NORESULT.');
			} else {
				console.log('error', err);
			}
		});
	});
};
init();

module.exports = { insertPresenceStatus, findPresenceStatus, insertHumidity, insertTemperature, findTemperature, findTemperatures, findHumidity, findHumidities, insertDeviceAction };