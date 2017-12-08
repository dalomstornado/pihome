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

const setHome = () => {
  return $.ajax({
    method: 'GET',
    url: `${baseUrl}/presence/home`,
    dataType: 'json'
  });
};

const setAway = () => {
  return $.ajax({
    method: 'GET',
    url: `${baseUrl}/presence/away`,
    dataType: 'json'
  });
};

module.exports = { getTemperatures, getHumidities, setHome, setAway }