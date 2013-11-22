from tastypie import fields
from tastypie.resources import ModelResource,ALL_WITH_RELATIONS
from .models import *
#test url
#/elections/api/v1/race/?format=json&limit=300&locations__locations__county__in=Snohomish,King&race_status=featured



class SectionResource(ModelResource):
    class Meta:
        queryset = Section.objects.all()
        resource_name = 'sections'


class CategoryResource(ModelResource):

    sections = fields.ToManyField(SectionResource, 'sections',null=True,full = True)
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'


