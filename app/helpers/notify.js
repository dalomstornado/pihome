const request = require('request');
const types = require('../common/types');

const baseUrl = 'https://my.locative.io'
const sessionId= '709f2632415bd579d26343feae85a5a07d6c7d0c'

const getPrettyDate = () => {
	return new Date().toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, '');
};

const notify = (severity, message) => {
	switch (severity) {
		case types.Severity.WARNING:
		case types.Severity.ALARM:
		postNotification(`${getPrettyDate()} ${severity}: ${message}`);
	}		
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

module.exports = (severity, message) => { return notify(severity, message) };