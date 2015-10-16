jQuery(function() {
  // Flickr Key
  var apiKey = 'd924f5ea2a765922fc8794b3f9942133';

  jQuery('<img alt="" />').attr('id', 'loader').attr('src', 'ajax-loader.gif').appendTo('#image-container');

  function getQueryVar(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable){
        return pair[1];
      }
    }
    return(false);
  }

  function flickrMain() {
    var baseUrl = 'https://api.flickr.com/services/rest/?jsoncallback=?';
    var flickrOptions = {
      method: 'flickr.photos.search',
      api_key: apiKey,
      tags: getQueryVar('tags'),
      min_taken_date: getQueryVar('min_date'),
      max_taken_date: getQueryVar('max_date'),
      lat: getQueryVar('lat'),
      lon: getQueryVar('lng'),
      radius: getQueryVar('dist'),
      tag_mode: 'all',
      sort: 'date-taken-desc',
      extras: 'date_taken',
      format: 'json',
      per_page: '200',
      page: '1'
    }

    var count = 0;
    search();

    function search() {
      jQuery.getJSON(baseUrl, flickrOptions, function(data) {
        console.log(data.photos.photo.length);
        if (data.photos.photo.length == 0 && flickrOptions['page'] == 1) {
          // display no photos
        } else {
          jQuery.each(data.photos.photo, function(index, item) {
            var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + 
                           item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
            console.log(photoURL);
            var imgCont = "<figure> <img src='" + photoURL + "'></figure>";
            jQuery(imgCont).appendTo('#image-container');

            if (++count == data.photos.photo.length) {
              flickrOptions['page']++;
              count = 0;
              search();
            }
          });
        }
      });
    }
  }

  flickrMain();

});