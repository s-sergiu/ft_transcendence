#!/bin/sh

# debugging 
cp -R * /debug/.
cd /debug
chown -R $USER_GID:$USER_GID .
#

/usr/local/bin/npm start
