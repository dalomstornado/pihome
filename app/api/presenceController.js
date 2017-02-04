const mongodb = require('../helpers/mongodb');
const types = require('../common/types');

const insertPresenceStatus = (status, res) => {
	mongodb.insertPresenceStatus(status).then(() => {
		console.log(`Presence is set to: ${status}`);
		res.sendStatus(200);
	}, (error) => {
		console.log(`Error inserting presencestatus: ${error}`);
		res.sendStatus(500);
	});
};

const home = (req, res) => {
	insertPresenceStatus(types.PresenceStatus.HOME, res);
};

const away = (req, res) => {
	insertPresenceStatus(types.PresenceStatus.AWAY, res);
};

module.exports = { home, away };