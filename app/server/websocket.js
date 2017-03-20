let io = null;

const updateClients = (event) => {
	console.log('io', io);
	if (io) {
		console.log('updates clients');
	}
}

const init = (ioIn) => {
	io = ioIn;
}


module.exports = { updateClients, init }
