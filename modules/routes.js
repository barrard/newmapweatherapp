var dir = __dirname
dir=dir.split('/')
dir.length= dir.length-1
dir=dir.join('/')
var home = dir+'/www/'

module.exports = {

	homeRoute:function(req, res, next){
		console.log('homeroutes')
		console.log(__dirname)
			// res.sendFile(__dirname+'/../index.html')
			res.sendFile(home+'index.html')
	}


}