
var url = 'mongodb://localhost:27017/newMapApp';
var MongoClient = require('mongodb').MongoClient
var session=require('express-session')
var serverFunctions = require('./serverFunctions')

function connectMongo(callback){
	MongoClient.connect(url, function(err, db) {
	 	if(serverFunctions.handleError(err)){
	     	console.log("We are connected to " + db.databaseName)
	     	callback(db)
		}
	 })

}

function connectionToMongoCollection(collectionName, callback){
	connectMongo(function(db){
		var col = db.collection(collectionName)
		callback(db, col)
	})
}






exports.dataBase={
	//userdata is {username:username, password:password}
	findUser:function(userData){
		console.log('lets find the user')
		console.log(userData)
		connectionToMongoCollection('users', function(db, col){
			col.findOne(userData, function(err, item){
				if(serverFunctions.handleError(err)){
					if(item===null){
						console.log('user doesnt exist')
					}else{
						console.log('user does exist')
					}	
				}
				db.close()

			})

		})
	},
	connect:function(){

	}
}


exports.init = function(app){

	var MongoStore = require('connect-mongo')(session);

	var sessionOptions = {
  	store: new MongoStore({
    url:url
      // db: 'users',
      // host: 'mongodb://localhost',
      // port: 27017
    }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  name:'NEWMAPAPP',
  cookie: {
  	
  	httpOnly:false,
  	secure:false,
    maxAge:1000*60*60//one hour
  }
}
app.use(session(sessionOptions))



}