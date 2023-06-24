--! Previous: sha1:247bd1079c0b6a8823e5cd2428cd5f4d01222b93
--! Hash: sha1:fccd442ac0b2cc77b8fe7650d739d4f193efc73e

-- Enter migration here

-- Reversals

DROP INDEX IF EXISTS market_interval_timestamp CASCADE;

ALTER TABLE portfolio_history 
DROP CONSTRAINT IF EXISTS unique_market_interval_timestamp;

DROP VIEW IF EXISTS api.portfolio_history;
DROP VIEW IF EXISTS api.portfolio_summary;

-- Migrations

CREATE UNIQUE INDEX market_interval_timestamp
ON portfolio_history (market, interval, timestamp);

ALTER TABLE portfolio_history 
ADD CONSTRAINT unique_market_interval_timestamp
UNIQUE USING INDEX market_interval_timestamp;



CREATE VIEW api.portfolio_history AS (
    SELECT
        id,
        timestamp,
        timestamp / 1000 as timestamp_s,
        market,
        interval,
        usd_total_value,
        usd_held,
        interval_pct_return,
        benchmark_btc_value,
        benchmark_btc_interval_pct_return,
        benchmark_eth_value,
        benchmark_eth_interval_pct_return
    FROM
        portfolio_history
);

CREATE VIEW api.portfolio_summary AS (
    SELECT
        id,
        timestamp,
        timestamp / 1000 as timestamp_s,
        market,
        interval,
        usd_total_value,
        usd_held,
        interval_pct_return,
        benchmark_btc_value,
        benchmark_btc_interval_pct_return,
        benchmark_eth_value,
        benchmark_eth_interval_pct_return
    FROM
        portfolio_history
    ORDER BY
        timestamp DESC
    LIMIT
        1
);

GRANT USAGE on SCHEMA api to api_data_producer;
GRANT USAGE, SELECT ON SEQUENCE portfolio_history_id_seq TO api_data_producer;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON portfolio_history to api_data_producer;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON api.portfolio_history to api_data_producer;

GRANT SELECT on api.portfolio_history to api_anon;
GRANT SELECT on api.portfolio_summary to api_anon;
