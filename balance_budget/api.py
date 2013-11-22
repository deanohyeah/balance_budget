from tastypie.cache import SimpleCache
from tastypie import fields
from tastypie.resources import ModelResource,ALL_WITH_RELATIONS
from .models import *
from django.http import HttpResponse
#test url
#/elections/api/v1/race/?format=json&limit=300&locations__locations__county__in=Snohomish,King&race_status=featured


class CategoryResource(ModelResource):
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'


