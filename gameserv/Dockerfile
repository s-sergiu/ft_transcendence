FROM node:current-alpine3.19 as base

WORKDIR /app/.
COPY server/package.json .
RUN npm install
COPY server/. .

FROM base as dev
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]
