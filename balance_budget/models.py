from django.db import models




class Category(models.Model):
    name = models.CharField(max_length=200, blank=True)
    description = models.TextField(max_length=500, blank=True)
    order = models.IntegerField(null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'categories'


class Section(models.Model):
    name = models.CharField(max_length=200, blank=True)
    info = models.TextField(max_length=500, blank=True)
    value = models.IntegerField()
    category = models.ForeignKey(Category,related_name='sections')
    taxFlag = models.NullBooleanField()
    impact = models.TextField(max_length=500, blank=True)
    increaseDef = models.NullBooleanField()
    
    def __unicode__(self):
        return self.name  


class Benchmark(models.Model):
    name = models.CharField(max_length=200, blank=True)
    value = models.IntegerField()
    description  = models.CharField(max_length=200, blank=True)

    def __unicode__(self):
        return self.name
