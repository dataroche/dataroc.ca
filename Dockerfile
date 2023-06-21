# syntax = docker/dockerfile:1

FROM postgrest/postgrest

ENV PGRST_SERVER_PORT=5001
ENV PGRST_DB_SCHEMA=api
ENV PGRST_DB_ANON_ROLE=api_anon
ENV PGRST_DB_URI="${PGRST_DB_URI}"
