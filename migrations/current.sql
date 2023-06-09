-- Enter migration here
DROP VIEW IF EXISTS api.portfolio_history;

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

GRANT
SELECT
    on api.portfolio_history to api_anon;