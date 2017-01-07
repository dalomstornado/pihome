var Dispatcher = function(){
};

var httpDispatcher = require('httpdispatcher');
var dispatcher = new httpDispatcher();

Dispatcher.prototype.dispatch = function(request, response){
	dispatcher.dispatch(request, response)
};

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

module.exports = Dispatcher;