var express = require('express');
var server = express()

server.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

server.use(express.static('./public'));

server.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: 'sensorId'});
});

const PORT = 8080;
server.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});