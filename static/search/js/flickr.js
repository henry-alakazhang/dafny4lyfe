jQuery(function() {
  // Flickr Key + Secret
  var apiKey = 'd924f5ea2a765922fc8794b3f9942133';
  var apiSecret = '2eefb6d5fbaab4f4';
  window.alert("helo");

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
  //"http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=YOURAPIKEYHERE&tags=yokota+air+base&safe_search=1&per_page=20"  

//  $.getJSON('
});