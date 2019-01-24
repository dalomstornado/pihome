const mongodb = require('../server/mongodb');

const locationChange = (status) => {
  var success = false;
	mongodb.insertPresenceStatus(status).then(() => {
    console.log(`Presence is set to: ${status}`);
    success = true;
  }, (error) => {
    console.log(`Error inserting presencestatus: ${error}`);
    success = false;
  });
    retriggerDevices()
    return success;
  };

  const retriggerDevices = () => {
    console.log('retriggering devices');
  //1. get all locationBased devices
  //2. get all sensors triggering these locationBased devices
  //3. get the latest status on these devices
  //4. 
};



module.exports = { locationChange };