import { apiFetch } from "./api";

import { camelizeKeys } from 'humps';
import dayjs from 'dayjs';

export interface PortfolioHistory {
    id: number,
    timestampS: number,
    date: dayjs.Dayjs,
    market: string,
    interval: string,
    usdTotalValue: number,
    usdHeld: number,
    intervalPctReturn: number,
    benchmarkEthValue: number,
    benchmarkBtcValue: number,
    benchmarkPortfolioEthValue: number
    benchmarkPortfolioBtcValue: number
};

export async function getPorfolioHistory(): Promise<PortfolioHistory[]> {
    const response = await apiFetch('GET', '/portfolio_history', {});
    const data = camelizeKeys(response.data);

    const portfolioBaselineValue = data && data[0].usdTotalValue;

    const benchmarkEthPortfolioMult = data && (portfolioBaselineValue / data[0].benchmarkEthValue) || 1.0;
    const benchmarkBtcPortfolioMult = data && (portfolioBaselineValue / data[0].benchmarkBtcValue) || 1.0;

    return data.map((entry: PortfolioHistory) => {
        return {
            ...entry,
            date: dayjs.unix(entry.timestampS),
            benchmarkPortfolioEthValue: benchmarkEthPortfolioMult * entry.benchmarkEthValue,
            benchmarkPortfolioBtcValue: benchmarkBtcPortfolioMult * entry.benchmarkBtcValue
        };
    });
}