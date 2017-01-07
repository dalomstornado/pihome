var express = require('express');
var server = express()

server.all('/', function (req, res, next) {
  console.log(req.path)
  next() // pass control to the next handler
})

server.get('/', function(req, res){
	res.sendFile('/resources/index.html', { root: __dirname });
});

server.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: 'sensorId'});
});

const PORT = 8080;
server.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});