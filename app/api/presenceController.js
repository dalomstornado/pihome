const mongodb = require('../helpers/mongodb');
const types = require('../common/types');

const insertPresenceStatus = (status, res) => {
	mongodb.insertPresenceStatus(status).then(() => {
		console.log(`Presence: ${status}`);
		res.sendStatus(200);
	});
};

const home = (req, res) => {
	console.log('in controller');
	insertPresenceStatus(types.PresenceStatus.HOME, res);
};

const away = (req, res) => {
	insertPresenceStatus(types.PresenceStatus.AWAY, res);
};

module.exports = { home, away };