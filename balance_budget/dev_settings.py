from .settings import *
# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases
DATABASES['default'] = {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "balance_budget",
        "USER": "",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "",
    }