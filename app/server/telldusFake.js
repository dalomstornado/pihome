const turnOn = (deviceId, callback) => {
  console.log('Telldus fake turns on ' + deviceId);
  callback();
};

module.exports = { turnOn };