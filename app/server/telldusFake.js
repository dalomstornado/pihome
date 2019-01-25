const turnOn = (deviceId, callback) => {
  console.log('Telldus fake turns on ' + deviceId);
  callback();
};

const turnOff = (deviceId, callback) => {
  console.log('Telldus fake turns off ' + deviceId);
  callback();
};

module.exports = { turnOn, turnOff };