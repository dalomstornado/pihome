const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/pihome'

const insertPresenceStatus = (presenceStatus) => {
	mongoClient.connect(url, (err, db) => {
		assert.equal(null, err);

		let collectionName = 'presence';
		db.collection(collectionName, (err, collection) => {
			assert.equal(null, err);
			var doc = { 'date': new Date(), 'presenceStatus': presenceStatus }
			collection.insert(doc);
			console.log('Inserter presence');
		});
		db.close();
	});
};

module.exports = { insertPresenceStatus };
