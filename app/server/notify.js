const request = require('request');
const moment = require('moment');
const types = require('../common/types');

const baseUrl = 'https://my.locative.io'
const sessionId = '709f2632415bd579d26343feae85a5a07d6c7d0'
const notifications = new Map();
const intervalHour = 16;

const getPrettyDate = () => {
	return new Date().toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, '');
};

const postNotification = (message) => {
	request({
		url: `${baseUrl}/api/notifications`,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ sessionId, message }) 
	}, (error, response, body) => {
		if(error) {
			console.log(`Error when posting notification. ${error}`)
		}
	});
};

const notify = (severity, sensor, message, m) => {
	sSeverity = Object.keys(types.Severity)[severity];
	const notificationId = sSeverity + sensor.id;
	const lastNotification = notifications[notificationId];

	if (!lastNotification || moment().diff(lastNotification, 'hours') > intervalHour) {
		postNotification(`${moment.toString('YYYY-MM-DD HH:mm')} ${sSeverity}: ${message}`);
		notifications[notificationId] = m;
		console.log(`${m.toString('YYYY-MM-DD HH:mm')} ${sSeverity}: ${message}`);	
	} else {
		console.log(`Notification dropped. ${message}`);
	}
};
//c

module.exports = notify;