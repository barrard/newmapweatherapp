myMaps = {
  getUserLocation:function(){
    var latLong, map;
    $.getJSON("https://ipinfo.io")
    .always(function(data, r, t){
      console.log(data)
      locationDetails()
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


}
function locationDetails(){
  var mapDetails = $('#details')

  $(mapDetails).html(JSON.stringify(userData.LocDetails))


}

      
  function initMap(coords) {
    userData.coords = coords
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




 
// $('.mainNav > li').on('click', function(e){
//   console.log('click list')
//   console.log(e.target.innerHTML)
// })

