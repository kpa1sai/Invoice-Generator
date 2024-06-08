# dev_settings.py

from .settings import BASE_DIR

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'psddatabase',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'TEST': {
            'NAME': 'test_psddatabase'
        }
    }
}

# Any other local development settings
