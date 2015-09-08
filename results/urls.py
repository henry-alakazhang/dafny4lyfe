from django.conf.urls import url

from . import views

urlpatterns = [
    #eg. /results/tags/
    url(r'^tags/$', views.tag_search_results, name='tag_search_results'),
]