const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const types = require('../common/types');

const url = 'mongodb://localhost:27017/pihome';
const date = 'date';

const openDB = (collectionName, work) => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {
			assert.equal(null, err);
			db.collection(collectionName, (err, collection) => {
				assert.equal(null, err);
				work(collection, resolve, reject);
			});
			db.close();
		});
	});
};

const insertPresenceStatus = (presenceStatus) => {
	const insertPresence = (collection, resolve, reject) => {
		var doc = { date: new Date(), 'presenceStatus': presenceStatus }
		collection.insert(doc);
	};
	return openDB('presence', insertPresence);
};

const findPresenceStatus = () => {
	const findPresence = (collection, resolve, reject) => {
		collection.find().sort({ date: -1 }).limit(1).toArray((err, items) => {
			if (err) {
				reject(err);
			} else {
				let presenceStatus = types.PresenceStatus[items[0].presenceStatus];	
				resolve(presenceStatus);
			}
		});
	};
	return openDB('presence', findPresence);
};

module.exports = { insertPresenceStatus, findPresenceStatus };
