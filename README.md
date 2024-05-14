# ft_transcendence


### Environment file example:
``` 
STAGE=dev

#docker - script generated
USER_GID=user_gid
HOST_IP=ip_address
HOST_NAME=hostname
HTTP_METHOD=http
GENERATE_SOURCEMAP=false
REACT_PORT=port
DJANGO_DEBUG=False

#ports
DJANGO_PORT=port

#django
DJANGO_SECRET_KEY=
DJANGO_SUPERUSER_USERNAME='admin'
DJANGO_SUPERUSER_EMAIL='admin@localhost.com'
DJANGO_SUPERUSER_PASSWORD='admin'

#postgres
PGDATA=/usr/local/pgsql/data
LD_LIBRARY_PATH=/usr/local/pgsql/lib
MANPATH=/usr/local/pgsql/share/man
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=django_db

#42api
CLIENT_ID=from_42_intra_api_settings
CLIENT_SECRET=sfrom_42_intra_api_settings
REDIRECT_URI=https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${HTTP_METHOD}%3A%2F%2F${HOST_NAME}%3A${REACT_PORT}&response_type=code
```
