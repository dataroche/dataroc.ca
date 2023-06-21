--! Previous: -
--! Hash: sha1:ce87439718d809f5b0fa6113a3133b50bb8bd6e8

DROP VIEW IF EXISTS api.portfolio_history;

DROP TABLE IF EXISTS portfolio_history;

DROP TYPE IF EXISTS market_enum;

DROP TYPE IF EXISTS interval_enum;

DROP SCHEMA IF EXISTS api CASCADE;

CREATE SCHEMA api;

GRANT USAGE on SCHEMA api to api_anon;

CREATE TYPE market_enum as enum('kraken');

CREATE TYPE interval_enum as enum('week', 'day');

CREATE TABLE portfolio_history (
    id SERIAL NOT NULL,
    timestamp BIGINT NOT NULL,
    market market_enum,
    interval interval_enum,
    usd_total_value NUMERIC(48, 18),
    usd_held NUMERIC(48, 18),
    interval_pct_return NUMERIC(48, 18),
    benchmark_btc_value NUMERIC(48, 18),
    benchmark_btc_interval_pct_return NUMERIC(48, 18),
    benchmark_eth_value NUMERIC(48, 18),
    benchmark_eth_interval_pct_return NUMERIC(48, 18),
    PRIMARY KEY (id)
);

CREATE VIEW api.portfolio_history AS (
    SELECT
        *
    FROM
        portfolio_history
);

GRANT
SELECT
    on api.portfolio_history to api_anon;
