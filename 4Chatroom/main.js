var socket = io.connect('http://localhost:3000');
var username = null;

//Login
$('.login form').submit(function(event){
    event.preventDefault();
    username = $('#username').val();
    if(username!=''){
        socket.emit('login',username);
        $('.login').hide('1000');
        $('#showName').text('Your nickname: ' + username);
    }
    else{
        alert("Nickname can't be empty!");
    }
});

//Receive online users number
socket.on('numChange',function(num){
    $('#showUserOnline').text('Now online: ' + num);
})

//Broadcast login
socket.on('userLogin',function(name){
    var content = '<div class="user-join-leave">————Welcome<span style="font-weight:bold;"> ' + name + ' </span>join————</div>';
    $('#chat').append(content);
})
//Broadcast logout
socket.on('userLogout',function(name){
    var content = '<div class="user-join-leave">————User<span style="font-weight:bold;"> ' + name +' </span>leave————</div>';
    $('#chat').append(content);
})

//Send message
function sendMsg(){
    socket.emit('message', $('#msg').val());
    $('#msg').val('');
}
$('.sending form').submit(function(){
    sendMsg();
    return false;
});
$('.sending textarea').keypress(function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        sendMsg();
    }
});
//Receive message
socket.on('broadcast', function(data){
    $('#chat').append($('<li>').html(data.time + '@<span style="color: red;">' + data.username + '</span> : ' + data.data));
    if($("#auto")[0].checked){
        $(".history")[0].scrollTop = $(".history")[0].scrollHeight;
    }
});