

module.exports = {
	handleError:function(err){
		if(err){
			console.log('-----HandleError helper function found an error------')
			console.log(err)
			console.log('------End of error-------')
			return false
		}else{
			return true
		}
	},
}