var myPeople = function(){

	
	

	var mySubPeopleHTML = `
		<h1>My People</h1>
	<ul>
		<li>
			<button onclick="myPeople.getFriends()">Show My People</button>
		</li>
		<li>
			<p>Discover new people</p><button onclick="myPeople.findPeople()">Find New People</button>
		</li>
	</ul>
	
	`

	return{

		getUI:function(){
			$('#sub-people').append(mySubPeopleHTML)

		},
		getFriends:function(){
			var content = 'myPeople getFriends function'
			console.log(content)
			$('#people-details').html(content)
		},
		findPeople:function(){
			var content = 'find people by location?'
			console.log(content)
			$('#people-details').html(content)
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
}()