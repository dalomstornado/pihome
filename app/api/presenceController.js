const locationEventHandler = require('../server/locationEventHandler');
const types = require('../common/types');

const locationEvent = (status, res) => {
   if (locationEventHandler.locationChange(status)) {
    res.sendStatus(200);
   } else {
    res.sendStatus(500);
   }
};

const home = (req, res) => {
	locationEvent(types.PresenceStatus.HOME, res);
};

const away = (req, res) => {
	locationEvent(types.PresenceStatus.AWAY, res);
};

module.exports = { home, away };