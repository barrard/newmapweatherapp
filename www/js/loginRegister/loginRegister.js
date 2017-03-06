var userLoginBtnClicked=function(){
	console.log('handle the login')
	var username = $('#userLoginUsername').val()
	var password = $('#userLoginPassword').val()
	$.get('http://192.168.200.89:4444/userLogin', {
			username:username,
			password:password
		})
		.done(function(data){
			console.log('success userlogin')
			console.log(data)
		})
		.fail(function(jq, s, r){
			console.log('error')
			console.log(jq)
			console.log(s)
			console.log(r)
		})
}