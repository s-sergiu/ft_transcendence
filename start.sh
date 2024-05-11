#!/bin/bash

user_gid=$(eval id -g)
gid_to_replace=$(eval grep USER_GID .env | awk '{ print $1}' | cut -d '=' -f2-)

echo $gid_to_replace
echo $user_gid

cp .env .env.old
cat .env.old | sed "s/$gid_to_replace/$user_gid/"  > .env
rm .env.old
