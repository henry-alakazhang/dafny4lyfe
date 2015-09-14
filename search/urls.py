from django.conf.urls import url

from . import views

urlpatterns = [
   # /search/tags/
   url(r'^tags/?$', views.tag_search, name='tag_search'),
   # /search/tags/results/
   url(r'^tags/results/?$', views.tag_search_results, name='tag_search_results'),
   # /search/map/
   url(r'^map/?$', views.location_search, name='location_search'),
   # /search/map/results
   url(r'^map/results.*', views.location_search_results, name='location_search_results'),
   # /search/location/
   url(r'^location/?$', views.location_search_text, name='location_search_text`'),
   # /search/location/results/
   url(r'^location/results/?$', views.location_search_text_results, name='location_search_text_results'),
]