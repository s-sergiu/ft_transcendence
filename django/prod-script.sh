#! /bin/bash

cd backend
python manage.py makemigrations api
python manage.py migrate

if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python manage.py createsuperuser \
        --noinput \
        --username $DJANGO_SUPERUSER_USERNAME \
        --email $DJANGO_SUPERUSER_EMAIL
fi

gunicorn --bind=0.0.0.0:8000 backend.wsgi
