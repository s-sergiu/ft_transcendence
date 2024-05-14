# ft_transcendence


### Environment file example:
``` 
STAGE=dev

#docker - script generated
USER_GID=60385
HOST_IP=192.168.2.170
HOST_NAME=crossbow
HTTP_METHOD=http
GENERATE_SOURCEMAP=false
REACT_PORT=80
DJANGO_DEBUG=True

#ports
DJANGO_PORT=8000

#django
DJANGO_SECRET_KEY=hmf#0d77clsq#st7jm1z^%pv#@h1!ug(5$(ytiipbh0_mgz7jd
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
CLIENT_ID=u-s4t2ud-17c3d06c29a63f052756d513ba06d6d98b92ee95cb7b6a9dd4e66465af2477ab
CLIENT_SECRET=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
REDIRECT_URI=https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${HTTP_METHOD}%3A%2F%2F${HOST_NAME}%3A${REACT_PORT}&response_type=code
```
