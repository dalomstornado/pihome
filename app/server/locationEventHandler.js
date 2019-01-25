const mongodb = require('../server/mongodb');
const deviceHandler = require('../common/deviceHandler');
const telldus = require('../server/telldusFake');

const locationChange = (status) => {
  var success = false;
	mongodb.insertPresenceStatus(status).then(() => {
    console.log(`Presence is set to: ${status}`);
    success = true;
  }, (error) => {
    console.log(`Error inserting presencestatus: ${error}`);
    success = false;
  });
    retriggerDevices(status)
    return success;
  };

  const retriggerDevices = (status) => {
    if (status == 'HOME') {
      var locationBasedDevices = deviceHandler.getLocationBasedDevices();
      locationBasedDevices.forEach((device, index) => {
        telldus.turnOff(device.id, (err) => {
          if (!err){
            console.log('LocationChange trigger ' + device.name + ' OFF');
          } else {
            console.log('Error in triggering location based device: ' + err );
          }
        })
      });
    }

  //Rerun - problem with sequence of on and off.
  //1. get all locationBased devices
  //2. get all sensors triggering these locationBased devices
  //3. get the latest status on these devices
  //4. new event from all devices (off after on.)
};



module.exports = { locationChange };