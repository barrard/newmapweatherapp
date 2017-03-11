var userLoginBtnClicked=function(){
	console.log('handle the login')
	var username = $('#userLoginUsername').val()
	var password = $('#userLoginPassword').val()
	var userData = {
			username:username,
			password:password
		}
	helpers.verifyUserLoginData()
	$.get('http://192.168.200.89:4444/userLogin', userData)
		.done(function(data){
			$('#loginResults').html('data')
		})
		.success(function(data){
			console.log('succes?')
			$('#loginResults').html(JSON.stringify(data))
		})
		.fail(function(jq, s, r){
			console.log('error')
			console.log(jq)
			console.log(s)
			console.log(r)
		})
}


	var helpers = {
		verifyUserLoginData:function(userData){
		console.log('verify')

		console.log(userData)
		return true
	}
}