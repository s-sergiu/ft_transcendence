FROM python:3.12.3-alpine3.20 as base

WORKDIR /app/.
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN chmod +x *-script.sh && mv prod-script.sh backend/.

from base as dev
CMD [ "sh", "./dev-script.sh" ]

from base as prod
WORKDIR /app/backend
CMD [ "sh", "./prod-script.sh" ]
