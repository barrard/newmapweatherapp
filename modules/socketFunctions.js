var userData = require('./data')

module.exports = function(socket){
	return{
		someMoreUserData:function(data){
			// var data = userData.getData()
			socket.emit('someMoreUserData', data)
	}
		
	}

}