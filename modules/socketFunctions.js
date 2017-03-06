var userData = require('./data')

module.exports = function(socket){
	return{
		sendUserData:function(data){
			// var data = userData.getData()
			socket.emit('someMoreUserData', data)
	}
		
	}

}