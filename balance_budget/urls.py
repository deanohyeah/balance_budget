from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from balance_budget.api import CategoryResource

category_resource = CategoryResource()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'balance_budget.views.index', name='index'),

    url(r'^admin/', include(admin.site.urls)),
    (r'^api/', include(category_resource.urls))
)
