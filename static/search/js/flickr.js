// Flickr Key
var apiKey = 'd924f5ea2a765922fc8794b3f9942133';
// ContentFlow for images
var ajax_cf = new ContentFlow('ajax_cf');

function flickrMain(tags, min_date, max_date, lat, lng, dist) {
  var baseUrl = 'https://api.flickr.com/services/rest/?jsoncallback=?';
  var flickrOptions = {
    method: 'flickr.photos.search',
    api_key: apiKey,
    tags: tags,
    min_taken_date: min_date,
    max_taken_date: max_date,
    lat: lat,
    lon: lng,
    radius: (dist/1000),
    tag_mode: 'all',
    sort: 'date-taken-desc',
    extras: 'date_taken',
    format: 'json',
    per_page: '500',
    page: '1'
  }

  var count = 0;
  search();

  function search() {
    // Performs request using API (REST method) to flickr
    jQuery.getJSON(baseUrl, flickrOptions, function(data) {
      if (data.photos.photo.length == 0 && flickrOptions['page'] == 1) {
        // display no photos and do stuff to show no that there are no results
      } else {
        // create the DOM element for the contentflow

        // for each photo object returned
        jQuery.each(data.photos.photo, function(index, item) {
          var photoUrl = 'http://farm' + item.farm + '.static.flickr.com/' + 
                         item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
//            console.log(photoUrl);
          var divDom = document.createElement("DIV");
          divDom.setAttribute("class", "item");
          var imgDom = document.createElement("IMG");
          imgDom.setAttribute("class", "content");

          imgDom.src = photoUrl;
          divDom.appendChild(imgDom);
          
          ajax_cf.addItem(divDom, 'last');

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