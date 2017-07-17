"use strict";

var userLoginBtnClicked=function(){
	console.log('handle the login')
	var username = $('#userLoginUsername').val()
	var password = $('#userLoginPassword').val()
	var loginData = {
			username:username,
			password:password
		}
	helpers.verifyUserLoginData(loginData)
	$.ajax({
		type:'get',
		url:'http://192.168.200.93:4444/userLogin',
		data: loginData,
		xhrFields: {
		    withCredentials: true
		},
		crossDomain: true
	})
	// $.get('https://meetapp.us/userLogin', userData)
		.done(function(data){
			$('#loginResults').text('data')
		})
		.success(function(data){
			console.log('succes?')
			$('#loginResults').html(JSON.stringify(data))
			helpers.handleLoginResponse(data)

			console.log(userData)
		})
		.fail(function(jq, s, r){
			console.log('error')
			console.log(jq)
			console.log(s)
			console.log(r)
		})
}


	var helpers = {
		handleLoginResponse:function handlerloginresponse(data){
			console.log('handle resposne form login function handler with data response')
			console.log(data)
		},
		verifyUserLoginData:function(userData){
		console.log('verify')

		console.log(userData)
		return true
	}
}