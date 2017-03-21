const $ = require('jquery');

const baseUrl = 'http://localhost:8082/api';

const getTemperatures = (sensorId, from) => {
  return $.ajax({
    method: 'GET',
    url: `${baseUrl}/temperature/${sensorId}/${from.unix()}`,
    dataType: 'json'
  });
};

const getHumidities = (sensorId, from) => {
  return $.ajax({
    method: 'GET',
    url: `${baseUrl}/humidity/${sensorId}/${from.unix()}`,
    dataType: 'json'
  });
};

module.exports = { getTemperatures, getHumidities }