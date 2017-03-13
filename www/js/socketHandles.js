var SocketSingleton = 'this'
console.log(SocketSingleton)

//un coment for production
// if(window.location.protocol === "https:" || window.location.protocol === "file:"){
// 	var socket = io.connect('https://meetapp.us/');

// }else if(window.location.port === "4444"){
// 	var socket = io.connect('http://192.168.200.89:4444/');

// }else{
// 	var socket = io.connect('http://meetapp.us/');

// }

//testting....
 // Gsocket = io.connect('http://192.168.200.93:4444/');

 Gsocket = io.connect('https://meetapp.us/');

// var socket = io.connect();
// Gsocket.emit('userData', userData)
Gsocket.on('userConnected', function(data){
	console.log('userConnected')
	delete data.ua.ua
	userData.serverData = data
	// console.log(userData)
	Gsocket.emit('userData', userData)


})

Gsocket.on('someMoreUserData', function(data){
	console.log('user data from server')
	console.log(data)
	console.log('user data from server')
})

