var myPeople = {
	getUI:function(){
		$('#map').html('<h1>My People</h1>')
	},
	sendPush:function(){
		$.ajax({
			method:'get',
			url:'/sendfcm',
			success:function(){
				console.log('done')
			},
			fail:function(){
				console.log('fail')
			}
		})
	}
}