FROM node:current-alpine3.19 as base

RUN apk update
WORKDIR /app/.
COPY frontend/package.json .
RUN npm install

COPY frontend/. .
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]

#ARG REACT_APP_HOST_NAME
#ARG REACT_APP_DJANGO_PORT
#ARG REACT_APP_REDIRECT_URI
#
#ENV REACT_APP_HOST_NAME=$REACT_APP_HOST_NAME
#ENV REACT_APP_DJANGO_PORT=$REACT_APP_DJANGO_PORT
#ENV REACT_APP_REDIRECT_URI=$REACT_APP_REDIRECT_URI
#
#RUN ["npm", "run", "build"]
#
#FROM nginx:1.25-alpine3.19-slim 
#COPY configs/default.conf /etc/nginx/conf.d/.
#COPY --from=base /app/build /usr/share/nginx/html
