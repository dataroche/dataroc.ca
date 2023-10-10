import { apiFetch } from './api'

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
  serverSide: true,
}

export async function getPortfolioSummaryServerSide() {
  const data = await apiFetch<PortfolioSummary>(PORTFOLIO_SUMMARY_FETCH_ARGS)
  return data
}
