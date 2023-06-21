--! Previous: sha1:ce87439718d809f5b0fa6113a3133b50bb8bd6e8
--! Hash: sha1:247bd1079c0b6a8823e5cd2428cd5f4d01222b93

-- Enter migration here
DROP VIEW IF EXISTS api.portfolio_history;

DROP VIEW IF EXISTS api.portfolio_summary;

CREATE VIEW api.portfolio_history AS (
    SELECT
        id,
        timestamp / 1000 as timestamp,
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
        timestamp / 1000 as timestamp,
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

GRANT
SELECT
    on api.portfolio_history to api_anon;

GRANT
SELECT
    on api.portfolio_summary to api_anon;
