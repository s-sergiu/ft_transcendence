FROM node:current-alpine3.19 as base

WORKDIR /app/.
COPY frontend/package.json .
RUN npm install
COPY frontend/. .

FROM base as dev
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]

FROM base as build 

ARG REACT_APP_HOST_NAME
ARG REACT_APP_DJANGO_PORT
ARG REACT_APP_REDIRECT_URI
ENV REACT_APP_HOST_NAME=$REACT_APP_HOST_NAME
ENV REACT_APP_DJANGO_PORT=$REACT_APP_DJANGO_PORT
ENV REACT_APP_REDIRECT_URI=$REACT_APP_REDIRECT_URI
RUN ["npm", "run", "build"]

FROM nginx:1.25-alpine3.19-slim as prod
ARG REACT_APP_HOST_NAME
ENV REACT_APP_HOST_NAME=$REACT_APP_HOST_NAME
RUN apk add openssl &&  openssl req -x509 -newkey rsa:4096 -keyout /etc/ssl/certs/transcendence.key \ 
	-out /etc/ssl/certs/transcendence.crt -sha256 -days 3650 -nodes -subj "/C=DE/ST=Baden-Wurttemberg/L= \
	Heilbronn/O=42Heilbronn/OU=Sergiu Ster ROOT CA/CN=Sergiu Ster"
COPY configs/default.conf /etc/nginx/conf.d/.
RUN cat /etc/nginx/conf.d/default.conf | sed "s/$(grep server_name /etc/nginx/conf.d/default.conf)/\ \ \ \ server_name $REACT_APP_HOST_NAME/" > /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
