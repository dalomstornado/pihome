var express = require('express');
var app = express()

app.set('view engine', 'jade');

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

app.use(express.static('./public'));

app.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: + req.params.sensorId });
});

app.get('/test', function(req, res){
	res.render('test', { name: 'banan' });
});

const PORT = 8081;
var server = app.listen(PORT, function () {
  console.log('Server listening on port %s', PORT);
});