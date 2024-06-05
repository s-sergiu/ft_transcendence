#!/bin/sh

apk add openssl &&  openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out certificate.pem -sha256 -days 3650 -nodes -subj "/C=DE/ST=Baden-Wurttemberg/L=Heilbronn/O=42Heilbronn/OU=Sergiu Ster ROOT CA/CN=Sergiu Ster"

/usr/local/bin/npm start
