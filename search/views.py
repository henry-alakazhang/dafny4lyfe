from django.shortcuts import render

def tag_search(request):
    return render(request, 'search/tag_search.html')