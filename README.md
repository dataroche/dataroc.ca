# dataroc.ca

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL on fly.io](https://fly.io/docs/postgres/)
- **API**: [PostgREST](https://postgrest.org/en/stable/)
- **SQL Migrations**: [Graphile-Migrate](https://github.com/graphile/migrate)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)


## Database initialization

Outside of migrations, a basic initialization of the postgres database is required. Replace passwords with generated random hashes:

```sql
CREATE USER dataroc_admin WITH ENCRYPTED PASSWORD 'my-password';

GRANT ALL ON SCHEMA public TO dataroc_admin;

CREATE DATABASE dataroc;
GRANT ALL PRIVILEGES ON DATABASE dataroc TO admin;
GRANT ALL PRIVILEGES ON DATABASE dataroc TO dataroc_admin;

CREATE DATABASE dataroc_shadow;
GRANT ALL PRIVILEGES ON DATABASE dataroc_shadow TO admin;
GRANT ALL PRIVILEGES ON DATABASE dataroc_shadow TO dataroc_admin;

DROP ROLE IF EXISTS authenticator;
CREATE ROLE authenticator LOGIN NOINHERIT NOCREATEDB NOCREATEROLE NOSUPERUSER;
ALTER USER authenticator PASSWORD 'my-authenticator-password';

```
Then, connect to the dataroc database and create the anonymous user for PostgREST:

```sql
\c dataroc
CREATE ROLE api_anon nologin;
GRANT api_anon TO authenticator;

CREATE ROLE api_data_producer nologin;
GRANT api_data_producer TO authenticator;
```