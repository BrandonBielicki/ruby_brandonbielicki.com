var map;
var busNumbersArray = [];
var markersArray = [];

function initMap() {
  $("#timer").text("30");
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.7369792, lng: -84.48386540000001},
    zoom: 14
  });
  
  var routes = new Firebase("https://sizzling-fire-5776.firebaseio.com/routes");
  
  routes.orderByChild("RouteNumber").equalTo("26").on("value", function(snapshot) {
    //console.log(snapshot.val());
    $.each(snapshot.val(), function(i, val) {
		
        //console.log(val.BusNumber);
        busNumbersArray.push(val.BusNumber);
    });
    //console.log(busNumbersArray);
  });
  
  var vehicles = new Firebase("https://sizzling-fire-5776.firebaseio.com/vehicles");
  vehicles.on("value", function(snapshot) {
    resetTimer();
    clearMarkers();
    $.each(busNumbersArray, function(i,val) {
        //console.log(snapshot.child(val).val());
        var latlng = {lat: Number(snapshot.child(val).val().Lat), lng: Number(snapshot.child(val).val().Long)};
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: ""
        });
        markersArray.push(marker);
        
        
    });
  });
  
  //while (true) {
  //  console.log("TEST");
  //}
  SD=window.setInterval("stopWatch();", 1000);

}

    function stopWatch() {
      var time = $("#timer").text();
      $("#timer").text(time - 1);
      
    }
  
	function setMapOnAll(map) {
	  for(var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(map);
	  }
	}
	  
	function clearMarkers() {
		setMapOnAll(null);
		markersArray = [];
	}

	function showMarkers() {
		setMapOnAll(map);
	}
    
    function resetTimer() {
      $("#timer").text("30");
    }
    
    


