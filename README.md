# ft_transcendence


### Environment file example:
``` 
STAGE=dev

#docker - script generated
USER_GID=number
HOST_IP=ip_address
HOST_NAME=hostname
HTTP_METHOD=http
GENERATE_SOURCEMAP=false
REACT_PORT=80
DJANGO_DEBUG=True

#ports
GAME_IP=192.168.32.2
SUBNET=192.168.32.0/20
DJANGO_PORT=8000

#django
DJANGO_SECRET_KEY=put_hashed_key_here
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
CLIENT_SECRET=from_42_intra_api_settings
REDIRECT_URI=https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${HTTP_METHOD}%3A%2F%2F${HOST_NAME}%3A${REACT_PORT}&response_type=code
```
