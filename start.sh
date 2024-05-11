#!/bin/bash

user_gid=$(eval id -g)
gid_to_replace=$(eval grep USER_GID .env | awk '{ print $1}' | cut -d '=' -f2-)
ip=$(eval ip add | grep "BROADCAST,MULTICAST,UP,LOWER_UP" -A 2 | grep inet | awk '{print $2}' | cut -d '/' -f1)
ip_to_replace=$(eval grep HOST_IP= .env | cut -d '=' -f2)

cp .env .env.old
cat .env.old | sed "s/$gid_to_replace/$user_gid/"  > .env
rm .env.old
cp .env .env.old
cat .env.old | sed "s/$ip_to_replace/$ip/"  > .env
rm .env.old

docker compose up --build
