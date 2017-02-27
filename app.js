var production = true;
var development = false;
var port;
if(production){
	port = 80
}else{
	port=4444
}

var express = require('express')
var http = require('http')
var socketio = require('socket.io')
var routes = require('./modules/routes')
var socketRoutes = require('./modules/socketRoutes')
var app = express()
var server = http.createServer(app)
var io = socketio(server, {
	transports:['websocket', 'polling']
})

io.on('connection', function(socket){
	socketRoutes.socketRoutes(socket)
})
app.get('/', function(req, res, next){
	routes.homeRoute(req, res, next)
})
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static('www'));



server.listen(port)

console.log('app listeiong on port '+port)
