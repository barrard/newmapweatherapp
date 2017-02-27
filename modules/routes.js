var home = '/home/sailor/cordova/newMapApp/www/'
module.exports = {

	homeRoute:function(req, res, next){
		console.log(__dirname)
			res.sendFile(home+'index.html')
	}


}