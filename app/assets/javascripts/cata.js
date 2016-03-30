var map;
var busNumbersArray = [];
var markersArray = [];

function initMap() {
  $("#timer").text("30");
  
  num = $("#bus-select").val();
  if (num < 10 && num[0] != 0) {
    num = "0" + num;
  }
  getRoute(num);
  $("#bus-select").keypress(function (e) {
    if (e.which == 13) {
      num = $("#bus-select").val();
      if (num < 10 && num[0] != 0) {
        num = "0" + num;
      }
      window.location.href = "/cata/"+num;
    }
  });
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.7369792, lng: -84.48386540000001},
    zoom: 14
  });
  
  
  SD=window.setInterval("stopWatch();", 1000);
}

    function getRoute(num) {
      console.log(num);
      clearMarkers();
      
      var routes = new Firebase("https://sizzling-fire-5776.firebaseio.com/routes");
  
      routes.orderByChild("RouteNumber").equalTo(num).on("value", function(snapshot) {
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
    
    


