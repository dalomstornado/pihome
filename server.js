var express = require('express');
var app = express()

app.all('*', function (req, res, next) {
  console.log(req.url);
  next(); // pass control to the next handler
})

app.use(express.static('./public'));

app.get('/temperature/:sensorId', function(req, res){ //websockets
	res.json({temperature: + req.params.sensorId });
});

const PORT = 8080;
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});