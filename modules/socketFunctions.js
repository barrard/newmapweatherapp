var userData = require('./data')
var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });


module.exports = function(socket){
	return{
		someMoreUserData:function(data){
			// var data = userData.getData()
			socket.emit('someMoreUserData', data)
	}
		
	}

}