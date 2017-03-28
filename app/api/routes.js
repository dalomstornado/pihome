const express = require('express');
const presenceController = require('./presenceController');
const sensorController = require('./sensorController');

const router = express.Router();

//PRESENCE
router.route('/presence/home').get(presenceController.home);
router.route('/presence/away').get(presenceController.away);

//SENSORS
router.route('/temperature/:sensorId').get(sensorController.temperature);
router.route('/temperature/:sensorId/:from').get(sensorController.temperatures);
router.route('/humidity/:sensorId').get(sensorController.humidity);
router.route('/humidity/:sensorId/:from').get(sensorController.humidities);

module.exports = router;