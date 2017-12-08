const api = require('./api');
const types = require('../common/types');
const $ = require('jquery');

const callPresenceApi = (status) => {
	if (status === false) {
		api.setAway().then(() => {
			console.log('Away set'); //TODO: Why is not the promise resolved?
		}); 

	} else {
		api.setHome().then(() => {
			console.log('Home set');
		});
	}
}

const addListenerToPresenceStatus = () => {
	const $cbPresenceStatus = $('#presenceStatus');
	$cbPresenceStatus.click(() => {
    	callPresenceApi($cbPresenceStatus.is(":checked"));
  });
};

const init = () => {
	$(document).ready(function(){
		addListenerToPresenceStatus();
	});
};

export { init };