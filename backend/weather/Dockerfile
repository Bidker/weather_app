FROM python:3.8.0

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

RUN apt-get update && \
    apt-get install -y ca-certificates gcc postgresql musl-dev \
    libffi-dev \
    git bash \
    gettext \
    libevent-dev libc-dev libgdal-dev \
    python3-dev \
    libffi-dev

WORKDIR /weath_app
COPY requirements.txt /weath_app/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /weath_app/

ENTRYPOINT \
    python manage.py collectstatic --no-input && \
    python manage.py runserver 0:8002
