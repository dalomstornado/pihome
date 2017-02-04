const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const types = require('../common/types');

const url = 'mongodb://localhost:27017/pihome';
const date = 'date';

const openDB = (collectionName, work) => {	
	let promise = undefined;
	mongoClient.connect(url, (err, db) => {
		assert.equal(null, err); //TODO: Ta hand om
		db.collection(collectionName, (err, collection) => {
			assert.equal(null, err);
			promise = work(collection);	
		});
		db.close();
	});
	return promise;
};

const insertPresenceStatus = (presenceStatus) => {
	return new Promise((resolve, reject) => {
		const insertPresence = (collection) => {
			var doc = { date: new Date(), 'presenceStatus': presenceStatus }
			collection.insert(doc, (err, item) => {
				if (err) {
					reject(err);
				} else {
					resolve(presenceStatus);
				}
			});
		};
		return openDB('presence', insertPresence);
	});
};

const findPresenceStatus = () => {
	return new Promise((resolve, reject) => {
		const findPresence = (collection) => {
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
	});
};

module.exports = { insertPresenceStatus, findPresenceStatus };
