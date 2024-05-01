FROM node:current-alpine3.19 as base

RUN apk update
WORKDIR /app/.
COPY frontend .

RUN npm install

COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]
