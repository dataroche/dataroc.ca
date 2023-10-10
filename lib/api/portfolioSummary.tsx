import { apiFetch, useApiQuery } from './api'

export interface PortfolioSummary {
  id: number
  timestampS: number
  market: string
  interval: string
  usdTotalValue: number
  usdHeld: number
  intervalPctReturn: number
  usdRolling30dVolume: number
  tradesCount30d: number
  updatedAtS: number
}

const PORTFOLIO_SUMMARY_FETCH_ARGS = {
  url: '/portfolio_summary',
  asSingleJsonObject: true,
}

export function usePortfolioSummary(): PortfolioSummary | undefined {
  const { data } = useApiQuery<PortfolioSummary>(PORTFOLIO_SUMMARY_FETCH_ARGS)
  return data
}

export async function getPortfolioSummaryServerSide() {
  const data = await apiFetch({
    ...PORTFOLIO_SUMMARY_FETCH_ARGS,
    serverSide: true,
  })
  return data
}
