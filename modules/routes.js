

var dir = __dirname
dir=dir.split('/')
dir.length= dir.length-1
dir=dir.join('/')
var home = dir+'/www/'

var parser = require('ua-parser-js');

var userData = require('./data.js')
var databaseFunctions = require('./databaseFunctions')
var serverFunctions = require('./serverFunctions')

module.exports = function(app){
	console.log('routes!!!!!!!!!!!!!!!!!!!!.JJJSSSSS')
	var bodyParser = require('body-parser');
	var databaseFunctionsInit = require('./databaseFunctions').init(app)
	function sessionRegister(req){

				// console.log('+++++++++++++++++++++++++++++')
		// console.log(req.session)
		// console.log(req.session.id)
		console.log(userData.getData())

				// console.log('+++++++++++++++++++++++++++++')
	}
return {

	homeRoute:function(req, res, next){
		console.log('-----------HOME   ROUTE-------------')
		console.log('req.session.id')
		console.log(req.session.id)
		console.log('req.session')
		console.log(req.session)



var cookieString = req.headers.cookie
console.log('COOKIE STRING')
var cookieArr = cookieString.split(';')
for(var k = 0;k<cookieArr.length;k++){
	var cookie = cookieArr[k].split('=')
	console.log(cookie[0])
	console.log(cookie[1])
}

		console.log('????????????????????????????????????????????')
		console.log('homeroutes')
		sessionRegister(req, res)
		console.log(__dirname)
		console.log(home)
			// res.sendFile(__dirname+'/../index.html')
			res.sendFile(home+'index.html')
	},

	registrationIdPost:function(req, res, next){

		console.log('registrationIdPost url hit')
		sessionRegister(req, res)

		console.log(req.headers)
		console.log(req.body)
		req.session.registrationId=req.body.registrationId
		res.send(req.session)
		// res.send(JSON.stringify({ loggedIn:req.session.loggedIn}))

	},
	userLogin:function(req, res, next){
		// console.log('did we make it this far yet?')
		// console.log(req.query)
		if(serverFunctions.verifyUserLoginData(req.query)){
			databaseFunctions.dataBase.findUser(req.query, function(resultFromDB){
			res.send(resultFromDB)
			})
		}else{
			res.send('Your data doesnt meet a certain criteria')
		}

	}

}


}