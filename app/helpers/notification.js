const request = require('request');
const types = require('../common/types');

const baseUrl = 'https://my.locative.io'
const sessionId2 = '709f2632415bd579d26343feae85a5a07d6c7d0c'

const notify = (severity, message) => {
	switch (severity) {
		case types.Severity.WARNING:
		case types.Severity.ALARM:
			postNotification(message, severity);
	}		
};

const postNotification = (message2, severity) => {
	request({
		url: `${baseUrl}/api/notifications`,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ sessionId: sessionId2, message: `${severity} ${message2}` }) 
	}, (error, response, body) => {
		if(error) {
			console.log(`Error when posting notification. ${error}`)
		}
	});
};

module.exports = { notify }