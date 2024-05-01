FROM python:3.12-slim as base

WORKDIR /app/.
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN chmod +x script.sh
CMD [ "sh", "./script.sh" ]
