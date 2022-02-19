# FROM python:3.7
FROM python:3.7-alpine
RUN apk update && apk add libffi-dev postgresql-dev gcc python3-dev musl-dev
RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY . /app
ENV SECRET_TEXT the_super_secret_text
EXPOSE 8000

CMD ["python", "manage.py", "runserver"]

