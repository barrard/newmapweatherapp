

var dir = __dirname
dir=dir.split('/')
dir.length= dir.length-1
dir=dir.join('/')
var home = dir+'/www/'

var parser = require('ua-parser-js');
var request = require('request');

var userData = require('./data.js')
var databaseFunctions = require('./databaseFunctions')
var serverFunctions = require('./serverFunctions')
var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });

module.exports = function(app){
	logger.log('routes!!!!!!!!!!!!!!!!!!!!.JJJSSSSS')
	var bodyParser = require('body-parser');
	var databaseFunctionsInit = require('./databaseFunctions').init(app)
	function sessionRegister(req){

				// logger.log('+++++++++++++++++++++++++++++')
		// logger.log(req.session)
		// logger.log(req.session.id)
		logger.log(userData.getData())

				// logger.log('+++++++++++++++++++++++++++++')
	}
return {

	homeRoute:function(req, res, next){
		logger.log('-----------HOME   ROUTE-------------')
		logger.log('req.session.id')
		logger.log(req.sessionID)
		logger.log(req.session.id)
		logger.log('req.session')
		logger.log(req.session)
		logger.log('req.session.store')
		logger.log(req.session.store)



var cookieString = req.headers.cookie
logger.log(req.headers)
logger.log(cookieString)
if(cookieString){
	logger.log('COOKIE STRING')
	var cookieArr = cookieString.split(';')
	for(var k = 0;k<cookieArr.length;k++){
		var cookie = cookieArr[k].split('=')
		logger.log(cookie[0])
		logger.log(cookie[1])
	}
}

		logger.log('????????????????????????????????????????????')
		logger.log('homeroutes')
		sessionRegister(req, res)
		logger.log(__dirname)
		logger.log(home)
			// res.sendFile(__dirname+'/../index.html')
			res.sendFile(home+'index.html')
	},

	registrationIdPost:function(req, res, next){

		logger.log('registrationIdPost url hit')
		sessionRegister(req, res)

		logger.log(req.headers)
		logger.log(req.body)
		req.session.registrationId=req.body.registrationId
		res.send(req.session)
		// res.send(JSON.stringify({ loggedIn:req.session.loggedIn}))

	},
	userLogin:function(req, res, next){
		logger.log('whast the seession say when we hit this userLogin route?')
		logger.log(req.session.id)
		logger.log(req.session)
		logger.log('end of session!!!!!!!!============')
		// logger.log('did we make it this far yet?')
		// logger.log(req.query)
		if(serverFunctions.verifyUserLoginData(req.query)){
			databaseFunctions.dataBase.findUser(req.query, req.session, function(resultFromDB){
			logger.log('resultFromDB========================')
			logger.log(resultFromDB.message)
			res.send(resultFromDB.message)
			if(resultFromDB.created){
				logger.log('createing user and also session login true')
				req.session.loggedIn = true
				req.session.save(function(err){
					if(serverFunctions.handleError(err)){
						logger.log('session saved i htink')
					}
				})
				logger.log(req.session)
				logger.log(req.session.id)

			}else{
				logger.log('no user was created')
				// req.session.loggedIn = true
				logger.log(req.session)
				logger.log(req.session.id)
			}
			})
		}else{
			res.send('Your data doesnt meet a certain criteria')
		}

	},
	sendPushnotification:function(req, res, next){
		logger.log('attempting to send fcm')
			function sendMessageToUser(deviceId) {
				var id = 'AAAAOd4SlxQ:APA91bEJEdNfW-NJezYJcWhKpeR-BvzN41jqZsdppChugAuoVUU7zHuYILvau-UvvHIfobSHvdscwx0xtprOTNPJpvPoA1WSql30ndY0mTBMTGKwRYr3eubkTAbOCcpSezcwcFudoHpF'

			  request({
			    url: 'https://fcm.googleapis.com/fcm/send',
			    method: 'POST',
			    headers: {
			      'Content-Type' :' application/json',
			      'Authorization': 'key='+id
			    },
			    body: JSON.stringify(
			    {
			    	"data": {
			    	    "title": "Large Circular Icon",
			    	    "message": "Loaded from URL",
			  	    	"content-available": "1",
			  	    	"image": "https://dl.dropboxusercontent.com/u/887989/antshot.png",
			  	    	"actions":[
		  { "icon": "accept", "title": "note", "callback": "accept"},
		  { "icon": "reject", "title": "Reject", "callback": "reject"},
		  { "icon": "maybe", "title": "Maybe", "callback": "reject"},
						]

			  	    	},
			    	    "to" : deviceId
			    }
			    )


			  }, function(error, response, body) {
			    if (error) { 
			      logger.log(error, response, body); 
			    }
			    else if (response.statusCode >= 400) { 
			      logger.log('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
			    }
			    else {
			      logger.log('Done!')
			    }
			  });





		}

		sendMessageToUser(
			// "cwG5_1BK9Pc:APA91bHBjYeB7pRzh1qYojsgWpwrbAc8WO7lbVB-4Yczxtd23RTntgythQoo6AgGFdqL-vGoUQSr6hvKyFQB5L7-CXtoouKdsKlvfSbZByQDmye1RfBjQwCUuh7NedaOogO8xj690p9F"
		  "fDBxjLdxK7M:APA91bF9UIVubI6WOOiDTIHpLWQwfJk2tKMC1_FApqXr48kVQnobaDTrzoKk-QMK8JRkE70BXpFkoS3KKNihVyepVGwd5NIVEuGQcTofNW8_gMHLV-BRHVHBOEMou-us-px2e5uV2wJ7"
		  // "epNl4HIJ2qg:APA91bHQq6xIvTLcAtzRlU6qFFmtIDzF0pbcHW54CXY3Ws1LvNEuO8ewYnPuyuM--5TkwDClh2OumaQO7_KDmXAvba-qX4b8UOrLCRVOcyCHs2AAnMLSlpLnqyRPU-eboq42ijA1kRa4"

		  //, { message: 'Hello puf'}
		);

		res.send('nice try')
	}

}


}