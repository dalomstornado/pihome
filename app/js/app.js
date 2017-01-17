var express = require('express');
var app = express()
var path = require('path');

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

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