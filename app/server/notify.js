const request = require('request');
const types = require('../common/types');

const baseUrl = 'https://my.locative.io'
const sessionId= '709f2632415bd579d26343feae85a5a07d6c7d0'

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

const notify = (severity, message, moment) => {
	sSeverity = Object.keys(types.Severity)[severity];
	postNotification(`${moment.toString('YYYY-MM-DD HH:mm')} ${sSeverity}: ${message}`);
	console.log(`${moment.toString('YYYY-MM-DD HH:mm')} ${sSeverity}: ${message}`);
};
//c

module.exports = notify;