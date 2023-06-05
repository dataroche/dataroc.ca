DROP TABLE IF EXISTS portfolio_history;

DROP TYPE IF EXISTS market_enum;

DROP TYPE IF EXISTS interval_enum;

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
    PRIMARY KEY (id)
);