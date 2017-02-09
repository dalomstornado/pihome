var express = require('express');
var app = express();
var path = require('path');
var config = require('./models/config.json');
var mongodb = require('./helpers/mongodb');
const types = require('./common/types');
const notify = require('./helpers/notify');
const router = require('./api/routes');
const telldusEventHandler = require('./helpers/telldusEventHandler');

app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, './static')));
app.use('/api', router);

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

app.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: + req.params.sensorId });
});

app.get('/', function(req, res){
	res.render('index', config);
});

app.get('/list', function(req, res){
	telldus.getDevices(function(err,devices) {
	  if (err) {
	    console.log('Error: ' + err);
	  } else {
	    // The list of devices is returned
	    console.log(devices);
	  }
	});
	res.render('index', config);
});

const PORT = 8082;
var server = app.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});