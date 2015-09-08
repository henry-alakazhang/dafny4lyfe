from django.conf.urls import url

from . import views

urlpatterns = [
    #eg. /search/tags/
    url(r'^tags/$', views.tag_search, name='tag_search'),
]