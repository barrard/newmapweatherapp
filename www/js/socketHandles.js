var socket = io.connect('http://meetapp.us/');
// var socket = io.connect('http://192.168.200.89:4444/');
// var socket = io.connect();
socket.emit('userData', userData)
socket.on('userConnected', function(data){
	console.log('userConnected')
	delete data.ua.ua
	userData.serverData = data
	console.log(userData)

})

