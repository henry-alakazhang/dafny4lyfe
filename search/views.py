from django.shortcuts import render
import flickrapi
import math
import datetime

FLICKR_API_KEY = u'd924f5ea2a765922fc8794b3f9942133'
FLICKR_API_SECRET = u'2eefb6d5fbaab4f4'

flickr = flickrapi.FlickrAPI(FLICKR_API_KEY, FLICKR_API_SECRET, cache=True)
flickr.cache = flickrapi.SimpleCache(timeout=300, max_entries=200)

def tag_search(request):
   return render(request, 'search/tag_search.html')
    
def tag_search_results(request):
   context = {'tags' : request.POST['tags'].split(';')}
   return render(request, 'search/tag_search_results.html', context)
   
def location_search(request):
   return render(request, 'search/location_search.html')

def location_search_results(request):
   context = {}
   #comment out below for testing javascript implementation
   '''
   # location info
   lat = float(request.GET.get('lat', ''))
   lng = float(request.GET.get('lng', ''))
   dist = int(request.GET.get('dist', ''))
   context["lat"] = lat
   context["lng"] = lng
   bounds = point_dist_to_bbox(lat, lng, dist)
   tags = request.GET.get('tags', '')

   # time range info (unix timestamp)
   minDate = request.GET.get('min_date', '')
   maxDate = datetime.date.today().isoformat() #not timezone aware

   urlList = []
   i = 0
   for photo in flickr.walk(bbox=bounds, tags=tags, tag_mode='all',
                            min_taken_date=minDate, max_taken_date=maxDate,
                            sort='date-taken-desc', per_page='500',
                            extras='date_taken'):
      #https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size}.jpg
      photoUrl = ('https://farm' + photo.get('farm') + 
                  '.staticflickr.com/' + photo.get('server') + '/' + 
                  photo.get('id') + '_' + photo.get('secret') + '_b.jpg')
      #https://www.flickr.com/photos/{user-id}/{photo-id}
      originUrl = ('https://www.flickr.com/photos/' + photo.get('owner') + 
                   '/' + photo.get('id'))
      urlList.append((photoUrl, originUrl, photo.get('title'), photo.get('datetaken')))
      print(photoUrl)
      i += 1
      print(i)
   
   context['urlList'] = urlList'''
   return render(request, 'search/location_search_results.html', context)

# given coordinates and distance in metres, returns bounds as a string
# in the format "minLng, minLat, maxLng, maxLat"
# currently using quick and dirty method of 
# 111 111 = 1deg lat, 111 111 * cos(lat) = 1 deg lng
def point_dist_to_bbox(lat, lng, dist):
   minLat = lat - dist/111111
   maxLat = lat + dist/111111
   minLng = lng - (dist/111111 * abs(math.cos(lat)))
   maxLng = lng + (dist/111111 * abs(math.cos(lat)))
   bbox = "{0}, {1}, {2}, {3}".format(minLng, minLat, maxLng, maxLat)
   return bbox