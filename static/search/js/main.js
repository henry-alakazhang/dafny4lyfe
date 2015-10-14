
var map;
var marker;
var circle;
var radiusMarker;

function initMap() {
  var myLatlng = new google.maps.LatLng(-33.8650, 151.2094);

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatlng,
    zoom: 10,
    streetViewControl: false
  });

  marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: true
  });
  marker.addListener('dragend', updateAutocomplete);
  
  circle = new google.maps.Circle({
    map: map,
    clickable: false,
    radius: parseInt(document.getElementById('dist').value),
    fillColour:'#AA0000'
  })
  circle.addListener('radius_changed', function() {
    document.getElementById('dist').value = Math.round(circle.radius);
    radiusMarker.setPosition(getRadiusPosition());
  });
  circle.bindTo('center', marker, 'position');
  
  radiusMarker = new google.maps.Marker({
    position: getRadiusPosition(),
    map: map,
    draggable: true
  });
  radiusMarker.addListener('drag', function() {
    circle.setRadius(google.maps.geometry.spherical.computeDistanceBetween(marker.position, radiusMarker.position));
  });
  marker.addListener('drag', function() {
    radiusMarker.setPosition(getRadiusPosition());
  });
  
  map.addListener('click', function(e) {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    marker.setPosition({lat: lat, lng: lng})
    updateAutocomplete();
//    httpGetAsync('map/results?lat=' + lat + '&lng=' + lng, testCallback);
  });

  document.getElementById('submit').addEventListener('click', function() {
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var dist = document.getElementById('dist').value;
    var minDate = getMinDate();
    var maxDate = getMaxDate();
    var tags = document.getElementById('tags-input').value;
    window.location.href = '/search/map/results?lat=' + lat + '&lng=' + lng + 
                           '&dist=' + dist + '&tags=' + tags + '&min_date=' + minDate +'&max_date=' + maxDate;
  });
  
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  autocomplete.addListener('place_changed', function(){
    newSpot = autocomplete.getPlace().geometry.location;
    marker.setPosition(newSpot);
    map.setCenter(newSpot);
  });
}

function updateRadius() {
  var rad = parseInt(document.getElementById('dist').value);
  circle.setRadius(rad);
}

function getRadiusPosition(){
  bounds = circle.getBounds();
  return {lat: bounds.getNorthEast().lat()/2 + bounds.getSouthWest().lat()/2,
          lng: bounds.getNorthEast().lng()};
}

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function testCallback(responseText) {
  alert(responseText);
}

function getMinDate() {   
  var date = moment($("#minDate").datepicker("getDate")).format("YYYY-MM-DD");
  return date;
}

function getMaxDate() {   
  var date = moment($("#maxDate").datepicker("getDate")).format("YYYY-MM-DD");
  return date;
}

function updateAutocomplete() {gc = new google.maps.Geocoder();
  gc = new google.maps.Geocoder();
  radiusMarker.setPosition(getRadiusPosition());
  gc.geocode({'location': marker.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      start = results[0].address_components[0].short_name;
      if (results.length > 1 && (/\d$/.test(start) || /^\d/.test(start))) {
        document.getElementById('autocomplete').value = results[1].formatted_address;
      } else {
        document.getElementById('autocomplete').value = results[0].formatted_address;
      }
    } else {
      document.getElementById('autocomplete').value = "";
    }
  });
}
