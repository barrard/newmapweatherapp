var TheUserData = require('./data');
var parser = require('ua-parser-js');
module.exports={
	socketRoutes:function(socket){
		for(var k in socket){
			console.log(k)
		}
		var ua = parser(socket.client.request.headers['user-agent'])
		TheUserData.data.ua = ua
		TheUserData.data.ip = socket.conn.remoteAddress
		TheUserData.data.referer = socket.client.request.headers.referer
		TheUserData.data.cookie = socket.client.request.headers.cookie
		console.log(socket.client.request.headers)
		// console.log(socket.client.request.headers)
		// console.log(socket.client.request.headers)
		// console.log(TheUserData.data)
		socket.emit('userConnected', TheUserData.data)

		socket.on('userData', function(userData){
			console.log(userData)
		})
	}
}