--! Previous: sha1:cddf371ae408f06e17f2f1fba548630ba1a61c3c
--! Hash: sha1:a8399edb0947d66e75eb86ff9c576befd1f73e50

-- Replace using last_timestamp as the basis of the last 30 days, and instead of the updated_at_s
-- This allows intra-day updates because portfolio_history timestamps are day-aligned.

DROP VIEW IF EXISTS api.portfolio_summary;

CREATE VIEW api.portfolio_summary AS (
    WITH lastHistory AS (
        SELECT
            id,
            TO_TIMESTAMP(timestamp / 1000) as last_timestamp,
            timestamp / 1000 as timestamp_s,
            market,
            interval,
            usd_total_value,
            usd_held,
            interval_pct_return,
            benchmark_btc_value,
            benchmark_btc_interval_pct_return,
            benchmark_eth_value,
            benchmark_eth_interval_pct_return,
            updated_at / 1000 as updated_at_s
        FROM portfolio_history
        ORDER BY timestamp DESC
        LIMIT 1
    )

    SELECT
        *,
        (
            SELECT SUM(usd_value) 
            FROM trades 
            WHERE 
                TO_TIMESTAMP(timestamp / 1000) > (
                    TO_TIMESTAMP(updated_at_s) - INTERVAL '30 DAY'
                )
        ) as usd_rolling_30d_volume,
        (
            SELECT COUNT(*) 
            FROM trades 
            WHERE 
                TO_TIMESTAMP(timestamp / 1000) > (
                    TO_TIMESTAMP(updated_at_s) - INTERVAL '30 DAY'
                )
        ) as trades_count_30d
    FROM lastHistory
);


GRANT SELECT on api.portfolio_summary to api_anon;
