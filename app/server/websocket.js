module.exports = (io) => {
	const module = {}; 

	module.updateClients = (sensorEventType, event) => {
		console.log('updates clients');
			io.emit(sensorEventType, event);
	};

	return module;
};