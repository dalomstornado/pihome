const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const router = require('./api/routes');
const deviceHandler = require('./common/deviceHandler');
const websocket = require('./server/websocket')(io);
const telldusEventHandler = require('./server/telldusEventHandler')(websocket);

const PORT = 8082;

app.set('view engine', 'pug');
app.locals.pretty = true;
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, './static')));
app.use('/api', router);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    const siteName = 'http://localhost:' + PORT;
    res.setHeader('Access-Control-Allow-Origin', siteName);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

var server = http.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});