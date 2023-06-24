from decimal import Decimal
import enum
import datetime
from typing import Literal, Optional, TypedDict


ApiRole = Literal["api_anon", "api_data_producer"]


class MarketEnum(enum.Enum):
    kraken = enum.auto()


class IntervalEnum(enum.Enum):
    week = enum.auto()
    day = enum.auto()


class PortfolioHistory(TypedDict):
    id: Optional[int]

    # ms timestamp
    timestamp: int

    market: MarketEnum
    interval: IntervalEnum

    usd_total_value: Decimal
    usd_held: Decimal
    interval_pct_return: Decimal

    benchmark_btc_value: Decimal
    benchmark_btc_interval_pct_return: Decimal

    benchmark_eth_value: Decimal
    benchmark_eth_interval_pct_return: Decimal


def datetime_to_ms(dt: datetime.datetime):
    return (dt - datetime.datetime(1970, 1, 1)).total_seconds() * 1e3
