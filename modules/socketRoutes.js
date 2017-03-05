var TheUserData = require('./data');
var parser = require('ua-parser-js');
module.exports={
	socketRoutes:function(socket){
		// for(var k in socket){
		// 	console.log(k)
		// }
		var ua = parser(socket.client.request.headers['user-agent'])
		var  TUAD= TheUserData.getData()
		console.log('The user getData() function returned')
		console.log(TUAD)
		TUAD.ua = ua
		TUAD.ip = socket.conn.remoteAddress
		TUAD.referer = socket.client.request.headers.referer
		TUAD.cookie = socket.client.request.headers.cookie
		// console.log(socket.client.request.headers)
		// console.log(socket.client.request.headers)
		// console.log(socket.client.request.headers)
		// console.log(TheUserData.data)
		socket.emit('userConnected', TUAD)

		socket.on('userData', function(userData){
			var currentUserSnapShot = TheUserData.getData()
			console.log('Current status of userDataObect known as TheUserData -')
			console.log(currentUserSnapShot)
			console.log('data sent form the beloved user')
			console.log('---------------')
			console.log(userData)
		})
	}
}