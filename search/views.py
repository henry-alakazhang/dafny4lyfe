from django.shortcuts import render

def tag_search(request):
    return render(request, 'search/tag_search.html')
    
def tag_search_results(request):
   context = {'tags' : request.POST['tags'].split(';')}
   return render(request, 'search/tag_search_results.html', context)