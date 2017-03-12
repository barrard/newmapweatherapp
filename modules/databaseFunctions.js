
var url = 'mongodb://localhost:27017/newMapApp';
var MongoClient = require('mongodb').MongoClient
var session=require('express-session')
var serverFunctions = require('./serverFunctions')
var logger = require('tracer').colorConsole({
                    format : "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
                    dateformat : "HH:MM:ss.L"
                });

function connectMongo(callback){
	MongoClient.connect(url, function(err, db) {
	 	if(serverFunctions.handleError(err)){
	     	logger.log("We are connected to " + db.databaseName)
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

function insertOne(data, collection, options, callback){
	if((typeof options==='Object')&&(!Array.isArray(options))){
		var options = options
	}else{
		options={}
	}
	connectionToMongoCollection(collection, function(db, col){
		col.insertOne(data, function(err, item){
			if(serverFunctions.handleError(err)){
				logger.log('Data inserted')
				logger.log(item.result)
				callback(item)
			}
		})
		db.close()
	})


}






exports.dataBase={
	//userdata is {username:username, password:password}
	createNewUser:function(userData, reqSession){
		insertOne(userData, 'users', {options:'options'}, function(item){
			var newUser_id = item.ops[0]._id
			reqSession.username = userData.username
			reqSession.logged = true
			reqSession.mongoID = newUser_id
			reqSession.save(function(err){
				if(serverFunctions.handleError(err)){
					console.log(reqSession)
					console.log('saved session i think')
				}
			})
		})
	},
	loginUser:function(userData){
		logger.log('returning user to be logged in')
		logger.log(userData)
	},


	findUser:function(userData, reqSession, callback){
var self = this
logger.log('lets find the user')
logger.log(userData)
connectionToMongoCollection('users', function(db, col){
	col.findOne(userData, function(err, item){
		if(serverFunctions.handleError(err)){
			if(item===null){
				logger.log('user doesnt exist')
				callback({
					message:'user doesnt exist, creating new user',
					item:item,
					created:true
				})
				self.createNewUser(userData, reqSession)
			}else{
				logger.log('user does exist')
				logger.log(item)
				callback({
					message:'user does exist, Try another username',
					created:false,
					item:item
				})
				self.loginUser()

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
logger.log('IIINNNIIITTTTT DATABSE!!!')
	var MongoStore = require('connect-mongo')(session);

	var sessionOptions = {
  	store: new MongoStore({
    url:url
      // db: 'users',
      // host: 'mongodb://localhost',
      // port: 27017
    }),
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  name:'NEWMAPAPP',
  cookie: {
  	httpOnly:true,
  	secure:false,
    maxAge:1000*60*60*24*365//one year
  }
}
app.use(session(sessionOptions))



}