FROM postgres:latest

ENV POSTGRES_USER=imEvooh \
    POSTGRES_DB=todo_db

COPY init.sql /docker-entrypoint-initdb.d/