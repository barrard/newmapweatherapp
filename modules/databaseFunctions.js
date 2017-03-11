
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

function insertOne(data, collection, options){
	if((typeof options==='Object')&&(!Array.isArray(options))){
		var options = options
	}else{
		options={}
	}
	connectionToMongoCollection(collection, function(db, col){
		col.insertOne(data, function(err, item){
			if(serverFunctions.handleError(err)){
				console.log('Data inserted')
				console.log(item.result)
			}
		})
		db.close()
	})


}






exports.dataBase={
	//userdata is {username:username, password:password}
	createNewUser:function(userData){
		insertOne(userData, 'users', {options:'options'})
	},
	loginUser:function(userData){

	},


	findUser:function(userData, callback){
		var self = this
		console.log('lets find the user')
		console.log(userData)
		connectionToMongoCollection('users', function(db, col){
			col.findOne(userData, function(err, item){
				if(serverFunctions.handleError(err)){
					if(item===null){
						console.log('user doesnt exist')
						callback('user doesnt exist, creating new user')
						self.createNewUser(userData)
					}else{
						console.log('user does exist')
						console.log(item)
						callback('user does exist')
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
console.log('IIINNNIIITTTTT DATABSE!!!')
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
    maxAge:1000*60*60*24*365//one year
  }
}
app.use(session(sessionOptions))



}