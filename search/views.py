from django.shortcuts import render
import flickrapi

FLICKR_API_KEY = u'd924f5ea2a765922fc8794b3f9942133'
FLICKR_API_SECRET = u'2eefb6d5fbaab4f4'

flickr = flickrapi.FlickrAPI(FLICKR_API_KEY, FLICKR_API_SECRET)

def tag_search(request):
   return render(request, 'search/tag_search.html')
    
def tag_search_results(request):
   context = {'tags' : request.POST['tags'].split(';')}
   return render(request, 'search/tag_search_results.html', context)
   
def location_search(request):
   return render(request, 'search/location_search.html')

def location_search_results(request):
   context = {}
   lat = float(request.GET.get('lat', ''))
   lng = float(request.GET.get('lng', ''))
   minLat = lat - 0.2
   maxLat = lat + 0.2
   minLng = lng - 0.2
   maxLng = lng + 0.2

   context["lat"] = lat
   context["lng"] = lng
   bounds = "{0}, {1}, {2}, {3}".format(minLng, minLat, maxLng, maxLat)

   urlList = {}
   for photo in flickr.walk(bbox=bounds, tags='beach, sky, sunset', tag_mode='all'):
      #https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
      photoUrl = ('https://farm' + photo.get('farm') + 
                  '.staticflickr.com/' + photo.get('server') + '/' + 
                  photo.get('id') + '_' + photo.get('secret') + '.jpg')
      urlList[photoUrl] = {}
      print(photoUrl)
   
   context['urlList'] = urlList
   return render(request, 'search/location_search_results.html', context)

def location_search_text(request):
   return render(request, 'search/location_search_text.html')

def location_search_text_results(request):
   context = {'location' : request.POST['location']}
   return render(request, 'search/location_search_text_results.html', context)