const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const types = require('../common/types');

const url = 'mongodb://localhost:27017/pihome';
const date = 'date';

const insertPresenceStatus = (presenceStatus) => {
	mongoClient.connect(url, (err, db) => {
		assert.equal(null, err);

		let collectionName = 'presence';
		db.collection(collectionName, (err, collection) => {
			assert.equal(null, err);
			var doc = { date: new Date(), 'presenceStatus': presenceStatus }
			collection.insert(doc);
		});
		db.close();
	});
};

const findPresenceStatus = () => {
	let presenceStatus = types.PresenceStatus.AWAY;

	mongoClient.connect(url, (err, db) => {
		assert.equal(null, err);

		let collectionName = 'presence';
		db.collection(collectionName, (err, collection) => {
			assert.equal(null, err);
			collection.find().sort({ date: -1 }).limit(1).toArray((err, items) => {
				console.log(items);
				console.log('item: ' + items[0].presenceStatus);
				presenceStatus = types.PresenceStatus[items[0].presenceStatus];
				console.log('status: ' + presenceStatus);
			});
		});
		db.close();
	});
	return presenceStatus
};



module.exports = { insertPresenceStatus, findPresenceStatus };
