// including libraries
var http = require('http');
var static = require('node-static');
var app = http.createServer(handler);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;


// make html, js & css files accessible
// var files = new static.Server('./public');

// serve files on request
function handler(request, response) {
	request.addListener('end', function() {
		files.serve(request, response);
	});
}

// listen for incoming connections from client
io.sockets.on('connection', function (socket) {
  console.log("New client connected");

  // start listening for coords
  socket.on('send:LocationRecord', function (data) {
	console.log(data);
	
  	// broadcast your coordinates to everyone except you
  	socket.broadcast.emit('load:LocationRecord', data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// starts app on specified port
app.listen(port);
console.log('Your server goes on localhost:' + port);