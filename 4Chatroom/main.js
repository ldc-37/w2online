var socket = io.connect('http://localhost:3000');
var username;

$(function(){
    $('.sending button').mouseenter(function(){
        $('.sending button').stop(true);
        $('.sending button').animate({fontSize: '18px', padding: '9px'}, 50);
    });
    $('.sending button').mouseleave(function(){
        $('.sending button').animate({fontSize: '15px', padding: '11px'}, 50);
    });
})

//Login
$('.login form input').focus(function(){
    $('#errName').css('display','none');
    $('.login button').css('marginTop','20px');
});
$('.login form').submit(function(event){
    event.preventDefault();
    username = $('#username').val();
    if(username!=''){
        socket.emit('login',username);
        $('.login').fadeOut('1000');
        $('#showName').text('Your nickname: ' + username);
    }
    else{
        $('#errName').css('display','inherit');
        $('.login button').css('marginTop','3px');
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
    if(name!='unnamed'){
        var content = '<div class="user-join-leave">————User<span style="font-weight:bold;"> ' + name +' </span>leave————</div>';
        $('#chat').append(content);
    }
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
    if(username == data.username){
        content = data.time + '@<b><span style="color: red;">' + data.username + '</span> : ' + data.data + '</b>';
    }else{
        content = data.time + '@<span style="color: red;">' + data.username + '</span> : ' + data.data;
    }
    $('#chat').append($('<li>').html(content));
    if($("#auto")[0].checked){
        $(".history")[0].scrollTop = $(".history")[0].scrollHeight;
    }
});

function withdraw(msg){
    socket.emit('withdraw');//waiting...
}
socket.on('withdraw',function(msg){
    //waiting...
});