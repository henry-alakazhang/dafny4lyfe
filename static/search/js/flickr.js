var ajax_cf;

jQuery(function() {
  // Flickr Key
  var apiKey = 'd924f5ea2a765922fc8794b3f9942133';
  // ContentFlow for images
  ajax_cf = new ContentFlow('ajax_cf',{
    circularFlow: false,
    onclickActiveItem: function() {}, // don't open link?
    onReachTarget: function(obj) {
      console.log(obj);
    }
  });

  function flickrMain() {
    var baseUrl = 'https://api.flickr.com/services/rest/?jsoncallback=?';
    var flickrOptions = {
      method: 'flickr.photos.search',
      api_key: apiKey,
      min_taken_date: getQueryVar('min_date'),
      max_taken_date: getQueryVar('max_date'),
      lat: getQueryVar('lat'),
      lon: getQueryVar('lng'),
      radius: (getQueryVar('dist')/1000),
      tag_mode: 'all',
      sort: 'date-taken-desc',
      extras: 'date_taken',
      format: 'json',
      per_page: '500',
      page: '1'
    }
    if (getQueryVar('tags') != '') {
      flickrOptions.tags = getQueryVar('tags');
      flickrOptions.tag_mode = getQueryVar('tag_mode');
    }

    var count = 0;
    search();

    function search() {
      // Performs request using API (REST method) to flickr
      jQuery.getJSON(baseUrl, flickrOptions, function(data) {
        if (data.photos.photo.length == 0 && flickrOptions['page'] == 1) {
          document.getElementById('ajax_cf').innerHTML = '<center style="color:#FFFFFF">No images found. <p>Try different search criteria.</p></center>';
          // display no photos and do stuff to show no that there are no results
        } else {
          // for each photo object returned
          jQuery.each(data.photos.photo, function(index, item) {
            var photoUrl = 'http://farm' + item.farm + '.static.flickr.com/' + 
                           item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
            var largePhotoUrl = 'http://farm' + item.farm + '.static.flickr.com/' + 
                           item.server + '/' + item.id + '_' + item.secret + '_c.jpg';
            var photoSourceUrl = 'http://flickr.com/photos/' + item.owner + '/' + item.id;
            var boxDom = document.createElement("A");
            boxDom.setAttribute("class", "fancybox item");
            boxDom.setAttribute("rel", "gallery");
            boxDom.setAttribute("href", largePhotoUrl);
            boxDom.setAttribute("title", item.title + " (" + item.datetaken + ")");
            boxDom.setAttribute("content", photoSourceUrl);
            var imgDom = document.createElement("IMG");
            imgDom.setAttribute("class", "content");
            imgDom.setAttribute("alt", item.title + " (" + item.datetaken + ")");

            imgDom.src = photoUrl;
            boxDom.appendChild(imgDom);
            
            ajax_cf.addItem(boxDom, 'first');
            
            // once all the items from current page have been returned
            // get items from next page
            // NEED TO CHANGE TO next page on end of scroll... else will load 4eva
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


// returns the value of the specified query parameter
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

/* hacky way to make gallery buttons work in the middle of the gallery*/
/* DOESN'T WORK ON ENDS */

$.fancybox.next = function ( direction ) {
    if ($.fancybox.current) {
        $.fancybox.jumpto($.fancybox.current.index -1, 'left', 'prev');
        ajax_cf.moveTo('right');
    }
};

$.fancybox.prev = function ( direction ) {
    if ($.fancybox.current) {
        $.fancybox.jumpto($.fancybox.current.index + 1, 'right', 'next');
        ajax_cf.moveTo('left');
    }
};