
var map;
var marker;
var circle;
var radiusMarker;

$(window).on('beforeunload', function (event) {
    saveToLocalStorage();
});

$(document).on('ready', function (event) {
    fillFromLocalStorage();
});

function saveToLocalStorage() {
    if (typeof(Storage) !== 'undefined') {
        localStorage.lat = marker.getPosition().lat();
        localStorage.lng = marker.getPosition().lng();
        localStorage.dist = document.getElementById('dist').value;
        localStorage.minDate = getMinDate();
        localStorage.maxDate = getMaxDate();
        localStorage.tag_mode = document.getElementById('any-toggle').checked ? 'any' : 'all';
        var tags = [];
        var tagBoxes = document.getElementsByClassName('token-label');
        for(var i = 0; i < tagBoxes.length; i++)
        {
            tags.push(tagBoxes[i].innerHTML);
        }
        localStorage.tags = JSON.stringify(tags);
    }    
}

function fillFromLocalStorage() {
    if (typeof(Storage) !== null) {     
        if (localStorage.tag_mode == 'any' || 'all') {
            if (localStorage.tag_mode == 'any') {
                $("#any-toggle").bootstrapToggle('on')
            } else {
                $("#any-toggle").bootstrapToggle('off')                
            }
        }   
        if (localStorage.tags != null) {
            var tags = JSON.parse(localStorage.tags);
            $("#tags-input").tokenfield('setTokens',tags);
//             console.log("restoring tags");
        } 
        if (localStorage.dist != null) {
            $("#dist").val(localStorage.dist);
        }
    }   
}

function initMap() {
    var myLatlng = new google.maps.LatLng(-33.8650, 151.2094);
    if (typeof(Storage) !== "undefined") {
        if (localStorage.lat != null && localStorage.lng != null) {
            myLatlng = new google.maps.LatLng(localStorage.lat,localStorage.lng);           
        }    
    }
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatlng,
    zoom: 11,
    streetViewControl: false
  });

  marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable: true,
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
  circle.addListener('center_changed', function() {
    if (radiusMarker) {
      radiusMarker.setPosition(getRadiusPosition()); 
    }
  });
  circle.bindTo('center', marker, 'position');
  
  radiusMarker = new google.maps.Marker({
    position: getRadiusPosition(),
    map: map,
    draggable: true,
    icon: document.getElementById('iconid').innerHTML,
    clickable: false,
  });
  radiusMarker.addListener('drag', function() {
    circle.setRadius(google.maps.geometry.spherical.computeDistanceBetween(marker.position, radiusMarker.position));
  });
  
  /* hack used to prevent the marker drag ending in a 'click' event */
  radiusMarker.addListener('dragstart', function() {
    radiusMarker.setClickable(true);
  });
  radiusMarker.addListener('dragend', function() {
    radiusMarker.setClickable(false);
    checkRadius();
  });
  
  map.addListener('click', function(e) {
    if (!radiusMarker.getClickable()) { // hek
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      marker.setPosition({lat: lat, lng: lng})
      updateAutocomplete();
      console.log("click!");
  //    httpGetAsync('map/results?lat=' + lat + '&lng=' + lng, testCallback);
    }
  });

  document.getElementById('submit').addEventListener('click', function() {
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var dist = document.getElementById('dist').value;
    var minDate = getMinDate();
    var maxDate = getMaxDate();
    var tag_mode = document.getElementById('any-toggle').checked ? 'any' : 'all';
    var tags = "";
    var tagBoxes = document.getElementsByClassName('token-label');
    for(var i = 0; i < tagBoxes.length; i++)
    {
        tags += tagBoxes[i].innerHTML + ",";
    }
    window.location.href = '/search/map/results?lat=' + lat + '&lng=' + lng + 
                           '&dist=' + dist + '&tags=' + tags + '&tag_mode=' + tag_mode +
                           '&min_date=' + minDate +'&max_date=' + maxDate;
  });
  
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  autocomplete.addListener('place_changed', function(){
    newSpot = autocomplete.getPlace().geometry.location;
    marker.setPosition(newSpot);
    map.setCenter(newSpot);
  });
  
  updateAutocomplete();
  checkRadius();
}

function updateRadius() {
  var rad = parseInt(document.getElementById('dist').value);
  if (!isNaN(rad) && rad > 0) {
    circle.setRadius(rad);
  } else {
    document.getElementById('dist').value = Math.round(circle.getRadius());
  }
  checkRadius();
}

/* fixes radius-related stuff for QoL
 * limits radius to [0, 32]km and zooms/pans if radius is unfitting to map zoom
 */
function checkRadius() {
  var rad = circle.getRadius();
  circle.setRadius((rad > 32000) ? 32000 : rad);
  currZoom = map.getZoom();
  if (rad >= 30000) {
    map.setZoom(9);
  } else if (rad >= 18000 && 30000 >= rad) {
    map.setZoom(10);
  } else if (rad >= 9000 && 18000 >= rad) {
    map.setZoom(11);
  } else if (rad >= 4500 && 9000 >= rad) {
    map.setZoom(12);
  } else if (rad >= 2000 && 4500 >= rad) {
    map.setZoom(13);
  } else if (rad >= 1000 && 2000 >= rad) {
    map.setZoom(14);
  } else if (rad >= 500 && 1000 >= rad){ 
    map.setZoom(15);
  } else if (rad >= 250 && 500 >= rad) {
    map.setZoom(16); 
  } else if (rad >= 100 && 250 >= rad) {
    map.setZoom(17);
  } else if (rad >= 50 && 100 >= rad) {
    map.setZoom(18);
  } else if (rad >= 25 && 50 >= rad) {
    map.setZoom(19);
  } else {
    map.setZoom(20);
  }
  // only recenter map if the zoom changed, so the user doesn't lose the marker
  if (currZoom != map.getZoom()) {
    map.setCenter(marker.position);
  }
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
  var date = moment($("#min").text(),"DD MMM YYYY").format("YYYY-MM-DD");
  return date;
}

function getMaxDate() {   
  var date = moment($("#max").text(),"DD MMM YYYY").format("YYYY-MM-DD");
  return date;
}

function updateAutocomplete() {
  var gc = new google.maps.Geocoder();
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
