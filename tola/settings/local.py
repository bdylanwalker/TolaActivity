from base import *


########## IN-MEMORY TEST DATABASE
import os

try:
    DATABASES = {
        'default': {
            'ENGINE': os.getenv('TOLA_DB_ENGINE'),
            'NAME': os.getenv('TOLA_DB_NAME'),
            'USER': os.getenv('TOLA_DB_USER'),
            'PASSWORD': os.getenv('TOLA_DB_PASS'),
            'HOST': os.getenv('TOLA_DB_HOST'),
            'PORT': os.getenv('TOLA_DB_PORT'),
        }
    }
except KeyError:
    # TODO log this
    DATABASES = {
        'default': {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": ":memory:",
        }
    }

from os.path import join, normpath

########## MANAGER CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = (
    ('test', 'test@test.com'),
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS
########## END MANAGER CONFIGURATION


########## DEBUG CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True

# See: https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
#TEMPLATE_DEBUG = DEBUG
########## END DEBUG CONFIGURATION


########## EMAIL CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
########## END EMAIL CONFIGURATION

########## EMAIL SETTINGS

########## END EMAIL SETTINGS

CORS_ORIGIN_ALLOW_ALL = True

########## GOOGLE CLIENT CONFIG ###########
GOOGLE_STEP2_URI = ''
GOOGLE_CLIENT_ID = ''
GOOGLE_CLIENT_SECRET = ''
SOCIAL_AUTH_LOGIN_REDIRECT_URL = os.getenv('SOCIAL_AUTH_LOGIN_REDIRECT_URL')
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.getenv('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.getenv('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')


########## CACHE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
########## END CACHE CONFIGURATION

######## If report server then limit navigation and allow access to public dashboards
REPORT_SERVER = False
OFFLINE_MODE = True
NON_LDAP = True
LOCAL_API_TOKEN = "ABC"



