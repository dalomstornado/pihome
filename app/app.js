var express = require('express');
var app = express()
var path = require('path');
var config = require('./config.json');
var telldus = require('telldus');

app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, './static')));

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

app.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: + req.params.sensorId });
});

app.get('/', function(req, res){
	telldus.turnOn(1,function(err) {
	  console.log('1 is now ON');
	});
	telldus.turnOff(1,function(err) {
	  console.log('2 is now OFF');
	});

	res.render('index', config);
});

app.get('/list', function(req, res){
	telldus.getDevices(function(err,devices) {
	  if ( err ) {
	    console.log('Error: ' + err);
	  } else {
	    // The list of devices is returned
	    console.log(devices);
	  }
	});
	res.render('index', config);
});

app.get('/gauge', function(req, res){
	res.render('gauge', { name: 'banan' });
});

const PORT = 8082;
var server = app.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});