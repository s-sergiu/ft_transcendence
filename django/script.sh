#! /bin/bash

## debugging 
cp -R * /debug/.
cd /debug/backend
chown -R $USER_GID:$USER_GID .
##

python manage.py makemigrations api
python manage.py migrate

if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python manage.py createsuperuser \
        --noinput \
        --username $DJANGO_SUPERUSER_USERNAME \
        --email $DJANGO_SUPERUSER_EMAIL
fi

chown -R $USER_GID:$USER_GID .
python manage.py runserver 0.0.0.0:8000
#gunicorn --bind=0.0.0.0:8000 backend.wsgi
