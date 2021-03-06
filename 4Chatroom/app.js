var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userOnline = 0;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var username = 'unnamed';
	userOnline++;
	io.emit('numChange',userOnline);
	console.log('a user connected. Online: ' + userOnline);

	socket.on('login',function(data){
		username = data;
		console.log(data + ' login');
		io.emit('userLogin', username);
	});
	
	socket.on('message', function(msg){
		var t = new Date();
		var nowTime = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
		console.log(nowTime + ' : \"' + username + '\" send message: ' + msg);
		io.emit('broadcast', {username:username, data:msg, time:nowTime});
	});

	socket.on('disconnect', function(){
		userOnline--;
		console.log('User \"' + username +'\" disconnected. Online: ' + userOnline);
		io.emit('numChange', userOnline);
		io.emit('userLogout', username);
	});
});

http.listen(3000, function(){
	console.log('listen on *:3000');
});