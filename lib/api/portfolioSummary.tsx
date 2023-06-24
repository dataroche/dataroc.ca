import { apiFetch } from "./api";

import { camelizeKeys } from 'humps';

export interface PortfolioSummary {
    id: number,
    timestamp_s: number,
    market: string,
    interval: string,
    usdTotalValue: number,
    usdHeld: number,
    intervalPctReturn: number,
};

export async function getPortfolioSummary(): Promise<PortfolioSummary> {
    const response = await apiFetch('GET', '/portfolio_summary', {});
    const data = camelizeKeys(response.data);
    return data[0];
}