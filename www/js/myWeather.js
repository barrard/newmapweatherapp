(function(){
	myWeather={
		getWeatherData:function(latLong){
			console.log(latLong)
	           $.ajax({
	                  url: 'https://api.darksky.net/forecast/ee56df7c95dbc07fbfe02bb565ee45fd/' + latLong.lat + ',' + latLong.lng+','+time+'?exclude=flags,minutly',
	                  dataType:'jsonp',
	                  //data : ,
	                   success: function(result){
	                     console.log(result)
	                     localStorage.setItem('weatherData', JSON.stringify(result))
	                    var weatherIcon = '<i class="wi wi-'+result.currently.icon+'"></i>';
	                    console.log(result.currently.icon)
	                    //for tests
	                    // var myLatlng = {lat:20.922460296691863 ,  lng: -156.3110422903265}
	                     marker = new MarkerWithLabel({
	                           position: latLong,
	                           // draggable: true,
	                           // raiseOnDrag: true,
	                           labelContent: weatherIcon,
	                           map: map,
	                           icon: ' ',
	                           labelAnchor: new google.maps.Point(25,25)
	                           // title:placeClicked+' '+result.currently.summary,
	                           // labelClass: "labels", // the CSS class for the label
	                           // labelStyle: {opacity: 0.75}
	                         });
			            }

			        // });

			})
		},
		getHistoricalWeatherData:function(latLong){
			if(this.findLatestDataInLocalStorage()){
				console.log('Data has not yet expired')
				this.handleWeatherDataInLocalStorage()
				return
			}else{
				console.log('Old data, time to update')
				var self=this
				var weatherDataArray = []
				// var lastStoredData = JSON.parse(localStorage.getItem('weatherData')).currently.time
				var timeNow = new Date()
				var dataCount = 10
				for(var x = 0; x<dataCount;x++){
					var year = timeNow.getFullYear()-x
					var yearlyDataTimeStamp = new Date(year,  timeNow.getMonth(), timeNow.getDate())
					yearlyDataTimeStamp = yearlyDataTimeStamp.getTime()/1000
					var api = 'https://api.darksky.net/forecast/ee56df7c95dbc07fbfe02bb565ee45fd/'
		           var excludes = '?exclude=flags,minutly'
		           $.ajax({
		                  url:  api + latLong.lat + ',' + latLong.lng+','+yearlyDataTimeStamp+excludes,
		                  dataType:'jsonp',
		                   success: function(result){
		                   	self.handleHistoricalDataReults(result, weatherDataArray, dataCount)
				           }
					})

				}
			}

		},
		handleHistoricalDataReults:function(result, weatherDataArray, dataCount){
			var self=this
			weatherDataArray.push(JSON.stringify(result))
			console.log(result)
			// localStorage.setItem(result.currently.time, JSON.stringify(result))
			console.log(weatherDataArray.length)
			if(weatherDataArray.length===dataCount){
			  	localStorage.setItem('weatherDataArray', weatherDataArray)
			  	self.setExpirationDate()
			  	self.handleWeatherDataInLocalStorage()

			  }
		},
		setExpirationDate:function(){
			console.log('setting expirationDate')
			var now = new Date()
			var resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()-23)
			console.log(resetTime.getTime())
			localStorage.setItem('weatherDataExpiration', resetTime.getTime())

		},
		findLatestDataInLocalStorage:function (){
			var latestDate = localStorage.getItem('weatherDataExpiration')
			if(latestDate===null){
				console.log('null')
				return false
			}else{
				var timeNow = new Date()
				var resetTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours()-23)
				console.log('Latest '+latestDate)
				console.log('timeNow '+resetTime.getTime())
				console.log((latestDate)-resetTime)
				return latestDate<=resetTime

			}
		},
		handleWeatherDataInLocalStorage:function(){
			var jsonarry = localStorage.getItem('weatherDataArray')
			jsonarry = JSON.parse("[" + jsonarry + "]");
			userData.weatherJSON = jsonarry
			console.log('saved weatherJSON as userData.weatherJSON')
			var dataReadyIcon = $('#details')
			// $(dataReadyIcon).html('Data should be ready to go')
			// $(dataReadyIcon).append('<button onclick="charts.makeTempChart()">Click for Chart?</button>')
			this.createDataSelect(dataReadyIcon)
		},
		createDataSelect:function(dataReadyIcon){
			console.log('ready to set up selction box')
			var div = $(dataReadyIcon)
			$(div).append("<ul id='multiSelectOptionsList'></ul>")



			// multiSelect.addMultiSelectListener($('#weatherTypeSelectP'))

			// $(div).append("<select multiple id='weatherDataSelect'></select>")
			// var weatherTypes = userData.weatherJSON[0].hourly.data[0]
			var weatherTypes = [
				'Temperature',
				'Cloud Cover',
				'Dew Point',
				'Humidity',
				'Ozone',
				'Preci. Intensity',
				'Preci. Probobility',
				'Preassure',
				'Visibility',
				'Wind Speed/Direction',
			]
			var len = weatherTypes.length
			// var select = $('#weatherDataSelect')				

			for(var x = 0;x<len;x++){
				var li = `
					<li
						onclick='charts.addSelectedClassToggle(this)'
						class='multiSelectListItem'>`
						+weatherTypes[x]+
					`</li>`

				$('#multiSelectOptionsList').append(li)

					
			}
  }
	}




})()


