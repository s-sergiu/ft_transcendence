#!/bin/bash

# Define the certificate information
COUNTRY="DE"
STATE="Baden-Württemberg"
LOCALITY="Heilbronn"
ORGANIZATION="42Heilbronn"
ORGANIZATIONAL_UNIT="IT"
COMMON_NAME="42Heilbronn.de"
EMAIL="rdoukali@student-42heilnronn.de"

# Generate the private key and certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout private-key.pem -out certificate.pem -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$COMMON_NAME/emailAddress=$EMAIL"
