from django.conf.urls import url

from . import views

urlpatterns = [
    #ie. /search/tags/
    url(r'^tags/?$', views.tag_search, name='tag_search'),
    #ie. /search/tags/results/
    url(r'^tags/results/?$', views.tag_search_results, name='tag_search_results'),
    
    #ie. /search/location/
    url(r'^location/?$', views.location_search_text, name='location_search_text`'),
    #ie. /search/location/results/
    url(r'^location/results/?$', views.location_search_text_results, name='location_search_text_results'),
]