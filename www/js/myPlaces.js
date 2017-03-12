var myPlaces = function(){


	var mySubPlacesHTML = `
		<h1>My Places</h1>
	<ul>
		<li>
			<button onclick="myPlaces.getPlaces()">Show My Places</button>
		</li>
		<li>
			<p>Create a collection of your favorite place</p><button onclick="myPlaces.createNewPlace()">Create New Place</button>
		</li>
		<li>
			<p>Discover new places</p><button onclick="myPlaces.findPlaces()">Find New Places</button>
		</li>
		<li>
			<p>Invite friends to a location</p><button onclick="myPlaces.createNewMeetUp()">Create MeetUp</button>
		</li>
	</ul>
	
	`

	return{

		getUI:function(){
			$('#sub-places').append(mySubPlacesHTML)
		},
		getFriendsList:function(){
			var content = 'get friends of this user, maybe call myPeople.getFriends()?'
			console.log(content)
			$('#places-details').html(content)
		},
		getPlaces:function(){
			content = 'get a list of this users places';
			console.log(content)
			$('#places-details').html(content)

		},
		createNewPlace:function(){
			var content = 'add this place to users list of places';
			console.log(content)
			$('#places-details').html(content)

		},
		createNewMeetUp:function(){
			var content = 'Create a new meet up is easy';
			console.log(content)
			$('#places-details').html(content)

			//list of users friends
			this.getFriendsList()
		},
		findPlaces:function(){
			var content = ('Find new places this user may like')
			console.log(content)
			$('#places-details').html(content)

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