const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/pihome'

const connect = () => {
	mongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		console.log('Connected successfully to mongodb');

		db.close();
	});
}

export { connect };