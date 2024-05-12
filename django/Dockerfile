FROM python:3.12-slim as base

WORKDIR /app/.
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN chmod +x *-script.sh

from base as dev
CMD [ "sh", "./dev-script.sh" ]

from base as prod
CMD [ "sh", "./prod-script.sh" ]
