var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ol = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	ol++;
	console.log('a user connected.now online ' + ol);
	socket.on('disconnect', function(){
		ol--;
		console.log('user disconnected.now online ' + ol);
	});
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listen on *:3000');
});