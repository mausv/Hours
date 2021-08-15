FROM python:3.9.2-slim-buster

WORKDIR /api

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD FLASK_APP=api.py flask run --host 0.0.0.0 --port 5000