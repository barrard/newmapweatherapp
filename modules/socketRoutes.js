var TheUserData = require('./data');
var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });


module.exports={
	socketRoutes:function(socket){
		var socketFunctions = require('./socketFunctions')(socket)

		


		// for(var k in socket){
		// 	logger.log(k)
		// }
		// var  TUAD= TheUserData.getData()
		// console.log('The user getData() function returned')
		// console.log(TUAD)
		// TUAD.ua = ua
		// TUAD.ip = socket.conn.remoteAddress
		// TUAD.referer = socket.client.request.headers.referer
		// TUAD.cookie = socket.client.request.headers.cookie
		// console.log('***********************************socketet request headers')
		// console.log(socket.client.request.headers)
		// console.log('***********************************socketet request headers')

		// console.log(socket.client.request.headers)
		// console.log(socket.client.request.headers)
		// console.log('***********************************TheUserData ')

		// console.log(TheUserData.data)
		// console.log('***********************************TheUserData ')

		// socketFunctions.someMoreUserData(TUAD)

		socket.on('userData', function(userData){
			var currentUserSnapShot = TheUserData.getData()
		// 	console.log('Current status of userDataObect known as TheUserData -')
		// 	console.log(currentUserSnapShot)
		// 	console.log('data sent form the beloved user')
		// 	console.log('---------------')
		// 	console.log(userData)
		})

		socket.on('registerEvent', function(data){
			logger.log('registerEvent')
			logger.log(data)
		})

		socket.on('pushRegistrationId', function(deviceRegistrationId){
			logger.log('pushRegistration Number')
			logger.log(deviceRegistrationId)
		})
	}
}