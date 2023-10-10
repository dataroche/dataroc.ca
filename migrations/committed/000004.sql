--! Previous: sha1:fccd442ac0b2cc77b8fe7650d739d4f193efc73e
--! Hash: sha1:cddf371ae408f06e17f2f1fba548630ba1a61c3c

-- Enter migration here

DROP VIEW IF EXISTS api.latest_trades;
DROP VIEW IF EXISTS api.all_trades;
DROP VIEW IF EXISTS api.portfolio_summary;
DROP VIEW IF EXISTS api.portfolio_history;

DROP TABLE IF EXISTS trades;

-- Add an updated_at column to the portfolio history entries to have the time of update, not only the day
ALTER TABLE portfolio_history
ADD COLUMN IF NOT EXISTS updated_at BIGINT;

CREATE TABLE trades (
    id TEXT NOT NULL,
    timestamp BIGINT NOT NULL,
    market market_enum NOT NULL,
    symbol TEXT NOT NULL,
    base_asset TEXT NOT NULL,
    quote_asset TEXT NOT NULL,
    is_buy BOOL NOT NULL,
    amount NUMERIC(48, 18) NOT NULL,
    price NUMERIC(48, 18) NOT NULL,
    usd_value NUMERIC(48, 18) NOT NULL,
    PRIMARY KEY (id)
);

-- Restricted access to api_data_producer
CREATE VIEW api.all_trades AS (
    SELECT
        *
    FROM
        trades
);

GRANT SELECT, INSERT, UPDATE ON api.all_trades to api_data_producer;

-- public view (last 100 trades only, redacted symbol)
CREATE VIEW api.latest_trades AS (
    SELECT
        id,
        timestamp,
        market,
        CASE 
            WHEN base_asset IN ('ETH', 'BTC') THEN base_asset
            ELSE '???'
        END as redacted_base_asset,
        quote_asset,
        is_buy,
        amount,
        price,
        usd_value
    FROM
        trades
    ORDER BY timestamp DESC
    LIMIT 100
);

GRANT
SELECT
    on api.latest_trades to api_anon;


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
        benchmark_eth_interval_pct_return,
        updated_at
    FROM
        portfolio_history
);


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
                    last_timestamp  - INTERVAL '30 DAY'
                )
        ) as usd_rolling_30d_volume,
        (
            SELECT COUNT(*) 
            FROM trades 
            WHERE 
                TO_TIMESTAMP(timestamp / 1000) > (
                    last_timestamp  - INTERVAL '30 DAY'
                )
        ) as trades_count_30d
    FROM lastHistory
);

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON api.portfolio_history to api_data_producer;

GRANT SELECT on api.portfolio_history to api_anon;
GRANT SELECT on api.portfolio_summary to api_anon;


-- Notify postgREST of a schema change
NOTIFY pgrst, 'reload schema';
