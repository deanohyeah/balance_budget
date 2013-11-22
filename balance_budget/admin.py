from django.contrib import admin

from .models import Category,Section,Benchmark


class categoryAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,  {'fields': [
            'name',
            'description',
            'order',
        ]}),
    ]


class sectionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,  {'fields': [
            'name',
            'info',
            'value',
            'category',
            'taxFlag',
            'impact',
            'increaseDef',
        ]}),
    ]
    list_display = ('__unicode__', 'category', 'value')
    list_filter = ('category',)
    
    


class BenchmarkAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,  {'fields': [
            'name',
            'value',
            'description',
        ]}),
    ]
    

admin.site.register(Category, categoryAdmin)
admin.site.register(Section, sectionAdmin)
admin.site.register(Benchmark, BenchmarkAdmin)
