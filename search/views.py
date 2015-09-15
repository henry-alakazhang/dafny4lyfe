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
   minLat = lat - 1
   maxLat = lat + 1
   minLng = lng - 1
   maxLng = lng + 1

   context["lat"] = lat
   context["lng"] = lng
   bounds = "{0}, {1}, {2}, {3}".format(minLng, minLat, maxLng, maxLat)

#   results = flickr.photos.search(bbox=bounds, tags='beach')
#   print(results)
   return render(request, 'search/location_search_results.html', context)

def location_search_text(request):
   return render(request, 'search/location_search_text.html')

def location_search_text_results(request):
   context = {'location' : request.POST['location']}
   return render(request, 'search/location_search_text_results.html', context)