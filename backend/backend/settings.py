from pathlib import Path
import os
import urllib.parse
from dotenv import load_dotenv
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'replace-me'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

def _get_database_config_from_env():
    # Prefer full DATABASE_URL (e.g. postgres://user:pass@host:port/dbname)
    db_url = os.environ.get('DATABASE_URL')
    if db_url:
        parsed = urllib.parse.urlparse(db_url)
        engine = 'django.db.backends.postgresql'
        return {
            'ENGINE': engine,
            'NAME': parsed.path[1:],
            'USER': urllib.parse.unquote(parsed.username) if parsed.username else '',
            'PASSWORD': urllib.parse.unquote(parsed.password) if parsed.password else '',
            'HOST': parsed.hostname or '',
            'PORT': parsed.port or '',
        }

    # Fall back to individual env vars for Postgres
    if os.environ.get('POSTGRES_DB'):
        return {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('POSTGRES_DB', 'web_umkm'),
            'USER': os.environ.get('POSTGRES_USER', 'web_umkm_user'),
            'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'strongpassword'),
            'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),
            'PORT': os.environ.get('POSTGRES_PORT', '5432'),
        }

    # Default to sqlite
    return {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }


DATABASES = {
    'default': _get_database_config_from_env()
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Media (uploaded files)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}

# Allow session auth so admin users logged-in in Django admin can use API endpoints
REST_FRAMEWORK.setdefault('DEFAULT_AUTHENTICATION_CLASSES', [
    'rest_framework.authentication.SessionAuthentication',
])

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]
CORS_ALLOW_CREDENTIALS = True
