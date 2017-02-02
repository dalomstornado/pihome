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
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {
			assert.equal(null, err);

			let collectionName = 'presence';
			db.collection(collectionName, (err, collection) => {
				assert.equal(null, err);
				
				collection.find().sort({ date: -1 }).limit(1).toArray((err, items) => {
					if (err) {
						reject(err);
					} else {
						let presenceStatus = types.PresenceStatus[items[0].presenceStatus];	
						resolve(presenceStatus)
					}
				});
			});
			db.close();
		});
	});
};



module.exports = { insertPresenceStatus, findPresenceStatus };
