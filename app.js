var production = false;
var development = false;


var express = require('express')
var http = require('http')
var https = require('https')
var server;
var secureServer;
var socketio = require('socket.io')
var routes = require('./modules/routes')
var socketRoutes = require('./modules/socketRoutes')
var app = express()


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
	socketRoutes.socketRoutes(socket)
})
app.get('/', function(req, res, next){
	routes.homeRoute(req, res, next)
})
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static('www'));




console.log('app listeiong on port '+port)
