//un coment for production
// if(window.location.protocol === "https:" || window.location.protocol === "file:"){
// 	var socket = io.connect('https://meetapp.us/');

// }else if(window.location.port === "4444"){
// 	var socket = io.connect('http://192.168.200.89:4444/');

// }else{
// 	var socket = io.connect('http://meetapp.us/');

// }

//testting....
var socket = io.connect('http://192.168.200.89:4444/');
// var socket = io.connect();
socket.emit('userData', userData)
socket.on('userConnected', function(data){
	console.log('userConnected')
	delete data.ua.ua
	userData.serverData = data
	console.log(userData)

})

