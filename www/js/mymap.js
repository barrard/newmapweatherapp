myMaps = {
  watchID:'',
  geoOptions:{
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
},
hasStarted:false,
  getUserLocation:function(){
    if(this.hasStarted === false){
      this.hasStarted=true
    
    var self = this
    if ("geolocation" in navigator) {
      userData.geolocation = true
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, self.geoOptions )
    } else {
      BackupGPSStrategy()
    }
  }else{
    console.log('already has started')
    return
  }


   


  },
  watchUserLocation:function(){
     myMaps.watchID = navigator.geolocation.watchPosition(function(position) {
      do_something(position.coords.latitude, position.coords.longitude);
    });
  },
  stopWatchUserLocation:function(watchID){
    navigator.geolocation.clearWatch(watchID);
  }


}
function geo_success(position) {
  (position.coords.latitude, position.coords.longitude);
  var latLong = userData.LocDetails = {
    lat:position.coords.latitude, lng:position.coords.longitude
  }
  initMap(latLong)
  myWeather.getHistoricalWeatherData(latLong)
  charts.loadChartCore()
}

function geo_error() {
  alert("Sorry, no position available.");
}

function BackupGPSStrategy(){
  var latLong, map;
  $.getJSON("https://ipinfo.io")
  .always(function(data, r, t){
    console.log(data)
    console.log('always?')
  })
   .done(function(ipinfo){
      userData.LocDetails = ipinfo
      console.log("Found location ["+ipinfo.loc+"] by ipinfo.io");
      var mylatLong = ipinfo.loc.split(",");
      console.log(mylatLong)
      console.log(parseFloat(mylatLong[0]))
      console.log(mylatLong[1])
      var latLong={lat:parseFloat(mylatLong[0]) ,  lng:parseFloat(mylatLong[1])}
      initMap(latLong)
      myWeather.getHistoricalWeatherData(latLong)
      charts.loadChartCore()

    })
    .fail(function(jqxhr, textStatus, error){
      $('#map').append('<div>Huge Fail</div>')
      // latLong={}
      // console.log('Error')
      // latLong.lat = -34.397
      // latLong.lng = 150.644
      // initMap(latLong)
      // myWeather.getWeatherData(latLong)
      // charts.loadChartCore()

    })
}


function locationDetails(coords){

  var geocoder = new google.maps.Geocoder;

  geocoder.geocode({'location': coords}, function(results, status) {
    if (status === 'OK') {
       if (results.length>0) {
        makeAddressSelectionBox(results)
        console.log(results)
        console.log(status)
        userData.locationDetails=results
       }else{
        window.alert('No results found for '+results[1]);
       }
     }else{
      window.alert('Geocoder failed due to: ' + status);

     }
  })

  var mapDetails = $('#details')

  $(mapDetails).html(JSON.stringify(userData.LocDetails))


}


// initMap({lat:-34.397 , lng: 150.644})
      
  function initMap(coords) {
    userData.coords = coords
//TODO more detail displaying ocation
        locationDetails(coords)
    var mapEl = document.getElementById('map')
     map = new google.maps.Map(mapEl,{
   // backgroundColor:'red',
   zoom:7,
   center: coords,
   mapTypeId: 'satellite'
 })
      // var marker = new google.maps.Marker({
      //   position: coords,
      //   map: map,
      //   title: 'title'
      // });
      //  marker = new MarkerWithLabel({
      //   opacity:0.5,
      //   position: coords,
      //   // labelContent:'<i class="material-icons">face</i>',
      //   // labelAnchor: new google.maps.Point(15, 15),
      //   // labelClass: "labels",
      //   icon:'',
      //   map: map,
      //   title: 'title',
      //   labelStyle: {opacity: 0.75}
      // });
    
    map.addListener('click', function(e){
      console.log('ya?')
      var lat = e.latLng.lat()
      var lng = e.latLng.lng()
      console.log(lat)
      console.log(lng)
    }, true)
}

function makeAddressSelectionBox(addressArray){

  var container = document.createElement('div')
  container.classList.add('modal-container')
  
  console.log(addressArray)
  var len = addressArray.length;
  for(var x = 0;x<len;x++){
    console.log(addressArray[x].formatted_address)
  }
  container.classList.add('grow-transition')
}




 
// $('.mainNav > li').on('click', function(e){
//   console.log('click list')
//   console.log(e.target.innerHTML)
// })

