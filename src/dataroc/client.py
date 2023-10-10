import os
import math
import enum
from typing import Any, Optional, List, Union
import jwt
import postgrest
from postgrest import APIError

import dataroc.types


class DatarocClient:
    def __init__(
        self,
        target_url: str,
        role: dataroc.types.ApiRole = "api_anon",
        jwt_secret: Optional[str] = None,
    ):
        self.target_url = target_url
        self.role = role
        headers = {
            "Authorization": f"Bearer {generate_jwt(target_url, role, jwt_secret=jwt_secret)}"
        }
        self.client = postgrest.SyncPostgrestClient(
            self.target_url, schema="api", headers=headers, timeout=60
        )
        self._wake()

    def _wake(self):
        try:
            self.client.from_table("portfolio_history").select("*").limit(1).execute()
        except APIError:
            pass

    def read_portfolio_histories(
        self, market: dataroc.types.MarketEnum, interval: dataroc.types.IntervalEnum
    ) -> List[dataroc.types.PortfolioHistory]:
        resp = (
            self.client.from_table("portfolio_history")
            .select("*")
            .eq("market", market.name)
            .eq("interval", interval.name)
            .order("timestamp")
            .execute()
        )
        return resp.data

    def read_latest_trade(
        self, market: dataroc.types.MarketEnum
    ) -> Optional[dataroc.types.Trade]:
        resp = (
            self.client.from_table("all_trades")
            .select("*")
            .eq("market", market.name)
            .order("timestamp", desc=True)
            .limit(1)
            .execute()
        )
        rows = resp.data
        return rows[0] if rows else None

    def insert_portfolio_histories(
        self, histories: List[dataroc.types.PortfolioHistory]
    ):
        self.client.from_table("portfolio_history").insert(
            [serialize_data(h) for h in histories]
        ).execute()

    def insert_trades(self, trades: List[dataroc.types.Trade]):
        self.client.from_table("all_trades").insert(
            [serialize_data(h) for h in trades], upsert=True
        ).execute()

    def delete_portfolio_history(
        self, history: Union[dataroc.types.PortfolioHistory, int]
    ):
        id_to_delete = history["id"] if isinstance(history, dict) else history
        if not id_to_delete:
            raise ValueError(f"No id provided: {history}")
        self.client.from_table("portfolio_history").delete().eq(
            "id", id_to_delete
        ).execute()


def generate_jwt(target_url: str, role: str, jwt_secret: Optional[str] = None):
    if jwt_secret is None:
        jwt_secret = os.environ["PGRST_JWT_SECRET"]
    return jwt.encode({"role": role, "aud": target_url}, jwt_secret, algorithm="HS256")


def serialize_data(data: Any):
    if isnan(data):
        return None
    elif isinstance(data, enum.Enum):
        return data.name
    elif isinstance(data, dict):
        return {key: serialize_data(value) for key, value in data.items()}
    else:
        return data


def isnan(obj: Any):
    try:
        return math.isnan(obj)
    except TypeError:
        return False
