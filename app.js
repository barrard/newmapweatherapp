var production = true;
var development = false;

var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });
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
	routes.sendPushnotification(req, res, next)

})





app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static('www'));




logger.log('app listeiong on port '+port)
