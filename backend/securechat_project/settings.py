import os
from pathlib import Path

# BASE DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY SETTINGS
SECRET_KEY = 'your-secret-key'  # Replace with a secure key
DEBUG = True
ALLOWED_HOSTS = ['.vercel.app']

# APPLICATIONS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',

    # Your app
    'securechat_api',
]

# MIDDLEWARE
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # First
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLS & WSGI
ROOT_URLCONF = 'securechat_project.urls'
WSGI_APPLICATION = 'securechat_project.wsgi.application'

# TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# DATABASE (MySQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'securechat',
        'USER': 'root',
        'PASSWORD': 'Soosai11',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# PASSWORD VALIDATORS (optional to simplify dev)
AUTH_PASSWORD_VALIDATORS = []

# CORS SETTINGS
CORS_ALLOW_ALL_ORIGINS = True
# Or specify allowed origins if needed:
# CORS_ALLOWED_ORIGINS = ['http://localhost:3000']

# STATIC & MEDIA
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# DEFAULT PRIMARY KEY
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
