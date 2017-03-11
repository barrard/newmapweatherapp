var TheUserData = require('./data');
module.exports={
	socketRoutes:function(socket){
		var socketFunctions = require('./socketFunctions')(socket)

		


		// for(var k in socket){
		// 	console.log(k)
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
			console.log('registerEvent')
			console.log(data)
		})

		socket.on('pushRegistrationId', function(deviceRegistrationId){
			console.log('pushRegistration Number')
			console.log(deviceRegistrationId)
		})
	}
}