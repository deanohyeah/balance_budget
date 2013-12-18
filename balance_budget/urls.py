from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from django.conf.urls import *
from tastypie.api import Api
from balance_budget.api import CategoryResource, BenchmarkResource

v1_api = Api(api_name='v1')
v1_api.register(CategoryResource())
v1_api.register(BenchmarkResource())
urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'balance_budget.views.index', name='index'),

    url(r'^admin/', include(admin.site.urls)),
    (r'^api/', include(v1_api.urls))
)
