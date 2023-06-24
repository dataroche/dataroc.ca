SHELL := /bin/bash

graphile-migrate-watch:
	source .env.local && graphile-migrate watch

frontend:
	source .env.local && npm run dev

postgrest:
	source .env.local && docker run --rm --net=host \
		-e PGRST_DB_URI="${PGRST_DB_URI}" \
		-e PGRST_JWT_SECRET="${PGRST_JWT_SECRET}" \
		-e PGRST_SERVER_PORT=5001 \
		-e PGRST_DB_SCHEMA=api \
		-e PGRST_DB_ANON_ROLE=api_anon \
		postgrest/postgrest

postgres-prod-proxy:
	fly proxy 15432:5432 -a dataroc-db