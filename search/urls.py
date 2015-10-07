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
   url(r'^map/results.*', views.location_search_results, name='location_search_results')
]