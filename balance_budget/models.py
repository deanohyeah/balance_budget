import threading
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.management import call_command



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
    category = models.ForeignKey(Category)
    taxFlag = models.NullBooleanField()
    impact = models.TextField(max_length=500, blank=True)
    increaseDef = models.NullBooleanField()
    
    def save(self, *args, **kwargs):
        """
        Override save method to call django bakery commands.
        This must happen after the item is actually saved in the database.
        """
        super(Section, self).save()
        if settings.BAKERY_ACTIVATED:
            call_command('build')
            call_command('publish')
    
    def __unicode__(self):
        return self.name  


class Benchmark(models.Model):
    name = models.CharField(max_length=200, blank=True)
    value = models.IntegerField()
    description  = models.CharField(max_length=200, blank=True)

    def __unicode__(self):
        return self.name
