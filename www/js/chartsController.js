var charts = {
	chartSets : [
	'apparentTemperature',
	'dewPoint',
	'windBearing',
	'windSpeed',
	'visibility',
	'pressure',
	'temperature',
	'cloudCover',
	'humidity',
	'ozone',
	'precipIntensity',
	'precipProbability'



	],
	getChartSetList:function(){
		return this.chartSets
	},
	loadChartCore:function(){
		console.log('loading google charts')
		google.charts.load('current', {packages: ['corechart']});
	},
	makeTempChart:function(){
		var chartLabelsArray = ['Time']
		var data = userData.weatherJSON
		console.log('I have this for data')
		console.log(data)
		var chartDataArray=[]
		 chartDataArray[0] = chartLabelsArray
		console.log('aray len = '+data.length)
		for(var x = 0;x<data.length;x++){
			// console.log('x = '+x)
			// add the year ot chartLabelsArray
			// console.log(data[x])
			var year = data[x].currently.time*1000
			// console.log('year '+year)
			year = new Date(year)
			// console.log('year '+year)

			year = year.getFullYear()
			chartLabelsArray.push(year.toString())
			// console.log('chart labels')
			// console.log(chartLabelsArray)
			var todaysHourlyArray = data[x].hourly.data //just grabing the first year for demo
			var len = todaysHourlyArray.length
			// console.log('whats going on here????')
			// console.log('todaysHourlArray length = '+len)
			for(var i = 0;i<len;i++){
				if(chartDataArray[i+1]===undefined){
					// console.log('undefined lets make it')
					chartDataArray[i+1]=[]
					// console.log(chartDataArray)
					// console.log('x = '+x)
				}
				if(x===0){
					var time = new Date(todaysHourlyArray[i].time*1000)
					time = time.getHours()
					chartDataArray[i+1].push(time)
					chartDataArray[i+1].push(todaysHourlyArray[i].temperature)

				}else{
					chartDataArray[i+1].push(todaysHourlyArray[i].temperature)
					// console.log(chartDataArray)
				}
				
				
			}// loop for each row of hourly data

				if(chartDataArray.length == len+1){
					// console.log('TempArray:  ')
					// console.log(chartDataArray)
					this.drawChart(chartDataArray, 'tempChart')
				}

		}//loop for each year as column

	},
	addSelectedClassToggle:function(e){
			console.log('clicked')
			if($(e).hasClass('selected')){

				$(e).removeClass('selected');
				console.log('remove chart '+e.innerHTML);
				this.removeChart(e.innerHTML)
			}else{
				$(e).addClass('selected')
				console.log('make chart '+e.innerHTML);
				this.createChart(e.innerHTML)

			}
		},
		removeChart:function(type){
			console.log(type)
			console.log('remove chart type: '+type)
			switch (type){
				case 'Temperature':
				$('#temperatureChart').css('visibility', 'hidden')
					break;
				case 'Cloud Cover':
				$('#cloudCoverChart').css('visibility', 'hidden')
					break;



			}

		},
		createChart:function(type){
			console.log('create chart type: '+type)
			switch (type){
				case 'Temperature':
				this.handleChartType('temperature')

					break;
				case 'Cloud Cover':
				this.handleChartType('cloudCover')


				// 'Humidity',
				// 'Ozone',
				// 'Preci. Intensity',
				// 'Preci. Probobility',
				// 'Preassure',
				// 'Visibility',
				// 'Wind Speed/Direction',



					break;
				case 'Dew Point':
					this.handleChartType('dewPoint')
						break;
				case 'Humidity':
					this.handleChartType('humidity')
						break;
				case 'Ozone':
					this.handleChartType('ozone')
						break;
				case 'Preci. Intensity':
					this.handleChartType('precipIntensity')
						break;
				case 'Preci. Probobility':
					this.handleChartType('precipProbability')
						break;
				case 'Preassure':
					this.handleChartType('pressure')
						break;
				case 'Visibility':
					this.handleChartType('visibility')
						break;
				case 'Wind Speed/Direction':
					this.handleChartType('windSpeed')
						break;
				case 'Preassure':
					this.handleChartType('pressure')
						break;
			}

		},
		handleChartType:function(type){
			if($('#'+type+'Chart').length===0){
				$('#chartsArea').append('<div id="'+type+'Chart"></div>')
			}
			this.makeChartType(type);
		},
		makeChartType:function(type){
			//all charts made will have 'Time' on the x-axis
			console.log(type)
			var chartLabelsArray = ['Time']
			var data = userData.weatherJSON
			console.log('I have this for data')
			console.log(data)
			var chartDataArray=[]
			 chartDataArray[0] = chartLabelsArray
			console.log('aray len = '+data.length)
			for(var x = 0;x<data.length;x++){
				// console.log('x = '+x)
				// add the year ot chartLabelsArray
				// console.log(data[x])
				var year = data[x].currently.time*1000
				// console.log('year '+year)
				year = new Date(year)
				// console.log('year '+year)

				year = year.getFullYear()
				chartLabelsArray.push(year.toString())
				// console.log('chart labels')
				// console.log(chartLabelsArray)
				var todaysHourlyArray = data[x].hourly.data //just grabing the first year for demo
				var len = todaysHourlyArray.length
				// console.log('whats going on here????')
				// console.log('todaysHourlArray length = '+len)
				for(var i = 0;i<len;i++){
					if(chartDataArray[i+1]===undefined){
						// console.log('undefined lets make it')
						chartDataArray[i+1]=[]
						// console.log(chartDataArray)
						// console.log('x = '+x)
					}
					if(x===0){
						var time = new Date(todaysHourlyArray[i].time*1000)
						time = time.getHours()
						chartDataArray[i+1].push(time)
						chartDataArray[i+1].push(todaysHourlyArray[i][type])

					}else{
						if(todaysHourlyArray[i][type]!=undefined){
							chartDataArray[i+1].push(todaysHourlyArray[i][type])
							// console.log(chartDataArray)
						}
					
					}
					
					
				}// loop for each row of hourly data

					if(chartDataArray.length == len+1){
						// console.log('TempArray:  ')
						// console.log(chartDataArray)
						console.log('data ready here it is i hope this ozone ting is easy')
						console.log(chartDataArray)
						console.log('type:  '+type)
						this.drawChart(chartDataArray, type+'Chart')
					}

			}//loop for each year as column

		},
	drawChart:function(chartDataArray, div){
		
		google.charts.setOnLoadCallback(drawChart);
		function drawChart() {
		      // Define the chart to be drawn.
		     var data = google.visualization.arrayToDataTable(chartDataArray)
		     	// [
		               // ['Year', 'Sales', 'Expenses'],
		               // ['2004',  1000,      400],
		               // ['2005',  1170,      460],
		               // ['2006',  660,       1120],
		               // ['2007',  1030,      540]
		             // ]);

		             var options = {
		               title: div,
		               // width:100,
		               // curveType: 'function',
		               legend: { position: 'bottom' }
		             };

		      // Instantiate and draw the chart.
		      var chart = new google.visualization.LineChart(document.getElementById(div));
		      chart.draw(data, options);
		    }	
	}

}