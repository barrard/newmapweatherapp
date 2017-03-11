var production = false;
var development = false;


var express = require('express')
var http = require('http')
var https = require('https')
var server;
var secureServer;
var bodyParser = require('body-parser')

var app = express()

var socketio = require('socket.io')
var routes = require('./modules/routes')(app)
var socketRoutes = require('./modules/socketRoutes')
var cors = require('cors')





app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



var port;
if(production){
	var secureRedirPort = 80
	port = 443
	sslOptions = require('./modules/sslOptions/sslOptions.js').sslOptions;
	secureServer = https.createServer(sslOptions, app);
	var io = socketio(secureServer, {
		transports:['websocket', 'polling']
	});
	server = http.createServer(app)
	server.listen(secureRedirPort)
	secureServer.listen(port)
	app.all('/*', function(req, res, next) {   
	 if (/^http$/.test(req.protocol)) {
	    var host = req.headers.host.replace(/:[0-9]+$/g, ""); // strip the port # if any
	    if ((port != null) && port !== 443) {
	      return res.redirect(301, "https://" + host + ":" + port + req.url);
	    } else {
	      return res.redirect(301, "https://" + host + req.url);
	    }
	  } else {
	    return next();
	  }
	});




}else{
	port=4444
	server = http.createServer(app)
	var io = socketio(server, {
		transports:['websocket', 'polling']
	});

	server.listen(port)


}


io.on('connection', function(socket){
 // socketFunctions = require('./modules/socketFunctions')(socket)
	socketRoutes.socketRoutes(socket)
	// socketFunctions.sendUserData('winning')
})
app.get('/', function(req, res, next){
	routes.homeRoute(req, res, next)
})
app.post('/registrationIdPost', function(req, res, next){
	routes.registrationIdPost(req, res, next)
})
app.get('/userLogin', function(req, res, next){
	routes.userLogin(req, res, next)
})
var request = require('request');
app.get('/sendfcm', function(req, res, next){
console.log('attempting to send fcm')
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
	      { "notification": {
	      	"Nick" : "Mario",
	      	"body" : "great match!",
	      	"Room" : "PortugalVSDenmark"
	      },
	      	"priority":"high",
	        "to" : deviceId
	      }
	    )
	    // body: JSON.stringify(
	    //   { "data": {
	    //   	"Nick" : "Mario",
	    //   	"body" : "great match!",
	    //   	"Room" : "PortugalVSDenmark"
	    //   },
	    //     "to" : deviceId
	    //   }
	    // )
	    // body: JSON.stringify(
	    //   { "data": {
	    //     "message": message
	    //   },
	    //     "to" : deviceId
	    //   }
	    // )

	  }, function(error, response, body) {
	    if (error) { 
	      console.error(error, response, body); 
	    }
	    else if (response.statusCode >= 400) { 
	      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
	    }
	    else {
	      console.log('Done!')
	    }
	  });





}

sendMessageToUser(
	"cwG5_1BK9Pc:APA91bHBjYeB7pRzh1qYojsgWpwrbAc8WO7lbVB-4Yczxtd23RTntgythQoo6AgGFdqL-vGoUQSr6hvKyFQB5L7-CXtoouKdsKlvfSbZByQDmye1RfBjQwCUuh7NedaOogO8xj690p9F"
  // "fDBxjLdxK7M:APA91bF9UIVubI6WOOiDTIHpLWQwfJk2tKMC1_FApqXr48kVQnobaDTrzoKk-QMK8JRkE70BXpFkoS3KKNihVyepVGwd5NIVEuGQcTofNW8_gMHLV-BRHVHBOEMou-us-px2e5uV2wJ7"
  // "epNl4HIJ2qg:APA91bHQq6xIvTLcAtzRlU6qFFmtIDzF0pbcHW54CXY3Ws1LvNEuO8ewYnPuyuM--5TkwDClh2OumaQO7_KDmXAvba-qX4b8UOrLCRVOcyCHs2AAnMLSlpLnqyRPU-eboq42ijA1kRa4"

  //, { message: 'Hello puf'}
);

res.send('nice try')

})





app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static('www'));




console.log('app listeiong on port '+port)
