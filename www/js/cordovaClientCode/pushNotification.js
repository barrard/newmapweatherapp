pushNotificationModule = {
	getSocket:function(socket){
		return socket
	},
	init:function(Gsocket){
		var push = PushNotification.init({
		     "android": {
		         "senderID": 248538896148
		     },
		     "ios": {
		       "sound": true,
		       "vibration": true,
		       "badge": true
		     },
		     "windows": {}
		 });
	
		push.on('registration', function(data) {

	        console.log(data)

	         console.log("registration event: " + data.registrationId);
	         document.getElementById("regId").innerHTML = data.registrationId;
	         var oldRegId = localStorage.getItem('registrationId');
	         if (oldRegId !== data.registrationId) {
	             // Save new registration ID
	             localStorage.setItem('registrationId', data.registrationId);
	             
	             Gsocket.emit('pushRegistrationId', data.registrationId)
	             // Post registrationId to your app server as the value has changed
	         }
	         $.ajax({
	         	method:'post',
	         	data:data,
	         	dataType:'json',
	         	url:'http://192.168.200.89:4444/registrationIdPost',
	         	complete:function(data){
	         		console.log(data)
	         	},
	         	success:function(data){
	         		console.log(data)
	         	},
	         	error:function(jq, status, error){
	         		console.log('err')
	         		console.log(jq)
	         		console.log(status)
	         		console.log(error)

	         	}
	         })
	     });


		push.on('error', function(e) {
		    console.log("push error = " + e.message);
		});
		push.on('notification', function(data) {
		    console.log('notification event');
		    console.log(data)
		    var cards = document.getElementById("cards");
		    var push = '<div class="row">' +
		      '<div class="col s12 m6">' +
		      '  <div class="card darken-1">' +
		      '    <div class="card-content black-text">' +
		      '      <span class="card-title black-text">' + data.title + '</span>' +
		      '      <p>' + data.message + '</p>' +
		      '      <p>' + data.additionalData.foreground + '</p>' +
		      '    </div>' +
		      '  </div>' +
		      ' </div>' +
		      '</div>';
		    cards.innerHTML += push;
		});




	}
}