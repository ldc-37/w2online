var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userOnline = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	userOnline++;
	console.log('a user connected.now online ' + userOnline);
	socket.on('disconnect', function(){
		userOnline--;
		console.log('user disconnected.now online ' + userOnline);
	});
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listen on *:3000');
});