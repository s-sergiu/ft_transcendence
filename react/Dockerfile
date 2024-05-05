FROM node:current-alpine3.19 as base

RUN apk update
WORKDIR /app/.
COPY frontend/package.json .
RUN npm install

COPY frontend/. .
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]
