from tastypie import fields
from tastypie.resources import ModelResource,ALL_WITH_RELATIONS
from .models import *
#test url
#/elections/api/v1/race/?format=json&limit=300&locations__locations__county__in=Snohomish,King&race_status=featured



class JustCategoryResource(ModelResource):

    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        max_limit = None

class SectionResource(ModelResource):
    category = fields.ForeignKey(JustCategoryResource, 'category',full=True)

    class Meta:
        queryset = Section.objects.all()
        resource_name = 'sections'
        full = True


class CategoryResource(ModelResource):

    sections = fields.ToManyField(SectionResource, 'sections',null=True,full = True)
    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        max_limit = None

class BenchmarkResource(ModelResource):

    class Meta:
        queryset = Benchmark.objects.all()
        resource_name = 'benchmark'
        max_limit = None

