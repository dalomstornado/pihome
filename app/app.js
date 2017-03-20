const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const router = require('./api/routes');
const deviceHandler = require('./common/deviceHandler');
const websocket = require('./server/webSocket')(io);
const telldusEventHandler = require('./server/telldusEventHandler')(websocket);

app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, './static')));
app.use('/api', router);

telldusEventHandler.init();

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

io.on('connection', function(socket) {
	console.log('Socket connected!');
});

app.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: + req.params.sensorId });
});

app.get('/', function(req, res){
	res.render('index', { sensors: deviceHandler.getSensors() });
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
var server = http.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});