from django.shortcuts import render

def tag_search(request):
    return render(request, 'search/tag_search.html')
    
def tag_search_results(request):
   context = {'tags' : request.POST['tags'].split(';')}
   return render(request, 'search/tag_search_results.html', context)
   
def location_search_text(request):
    return render(request, 'search/location_search_text.html')

def location_search_text_results(request):
    context = {'location' : request.POST['location']}
    return render(request, 'search/location_search_text_results.html', context)