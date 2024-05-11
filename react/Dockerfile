FROM node:current-alpine3.19 as base

RUN apk update
WORKDIR /app/.
COPY frontend/package.json .
RUN npm install

COPY frontend/. .
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]

#RUN ["npm", "run", "build"]

#FROM nginx:1.25-alpine3.19-slim 

#COPY configs/default.conf /etc/nginx/conf.d/.

#COPY --from=base /app/build /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]
