from django.shortcuts import render

def tag_search_results(request):
    context = {'tags' : request.POST['tags'].split(';')}
    return render(request, 'results/tag_search_results.html', context)