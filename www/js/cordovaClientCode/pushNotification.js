pushNotificationModule = {

	init:function(){
		var push = PushNotification.init({
		     "android": {
		         "senderID": 248538896148,
		         "sound": true,
		         "vibrate": true,
		         "forceShow":true,
		         "badge": true,
		         "icon":"icon",
		         "iconColor":"green",
		         // "clearNotifications":false,
		         "messageKey":"message",
		         "titleKey":"title"

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
	        var cards = document.getElementById("cards");
	        var button = '<button onclick="clearAllNotifications()"></button>'
	         console.log("registration event: " + data.registrationId);
	         document.getElementById("regId").innerHTML = data.registrationId;
	         var oldRegId = localStorage.getItem('registrationId');
	         if (oldRegId !== data.registrationId) {
	             // Save new registration ID
	             localStorage.setItem('registrationId', data.registrationId);
	             
	             // Post registrationId to your app server as the value has changed
	         }
	         $.ajax({
	         	method:'post',
	         	data:data,
	         	dataType:'json',
	         	url:'http://192.168.200.93:4444/registrationIdPost',
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
			setBadge(successHandler, errosHandler, {badge:data.badge})
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
		})
		function setBadge(successHandler, errosHandler, numb){
			push.setApplicationIconBadgeNumber(successHandler, errosHandler, numb)
}
		function successHandler(d){
			console.log('success'+d)
		}

		function errosHandler(d){
			console.log('fail'+d)
		}




	}
}