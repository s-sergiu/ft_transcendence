FROM node:current-alpine3.19 as base

WORKDIR /app/.
COPY server/package.json .
RUN npm install
COPY server/. .

FROM base as dev
COPY dev-script.sh .
RUN chmod +x dev-script.sh
CMD ["./dev-script.sh"]

FROM base as prod
COPY prod-script.sh .
RUN chmod +x prod-script.sh
CMD ["./prod-script.sh"]
