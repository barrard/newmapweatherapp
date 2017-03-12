var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });


module.exports = {
	handleError:function(err){
		if(err){
			logger.log('-----HandleError helper function found an error------')
			logger.log(err)
			logger.log('------End of error-------')
			return false
		}else{
			return true
		}
	},
	verifyUserLoginData:function(userData){
		logger.log('verify')

		logger.log(userData)
		return true
	}
}