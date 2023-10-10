import { useApiQuery } from './api'

import dayjs from 'lib/dayjs'

export interface PortfolioHistory {
  id: number
  timestampS: number
  datetime: dayjs.Dayjs
  dateStr: string
  market: string
  interval: string
  usdTotalValue: number
  usdHeld: number
  intervalPctReturn: number
  benchmarkEthValue: number
  benchmarkBtcValue: number
  benchmarkPortfolioEthValue: number
  benchmarkPortfolioBtcValue: number
}

export function usePortfolioHistory(): Array<PortfolioHistory> {
  const { data } = useApiQuery<Array<PortfolioHistory>>({
    url: '/portfolio_history?order=timestamp_s.asc',
  })

  if (data) {
    const portfolioBaselineValue = data && data[0].usdTotalValue

    const benchmarkEthPortfolioMult =
      (data && portfolioBaselineValue / data[0].benchmarkEthValue) || 1.0
    const benchmarkBtcPortfolioMult =
      (data && portfolioBaselineValue / data[0].benchmarkBtcValue) || 1.0

    return data.map((entry: PortfolioHistory): PortfolioHistory => {
      const dayjsDate = dayjs.unix(entry.timestampS)
      return {
        ...entry,
        datetime: dayjsDate,
        dateStr: dayjsDate.utc().format('YYYY-MM-DD'),
        benchmarkPortfolioEthValue:
          benchmarkEthPortfolioMult * entry.benchmarkEthValue,
        benchmarkPortfolioBtcValue:
          benchmarkBtcPortfolioMult * entry.benchmarkBtcValue,
      }
    })
  } else {
    return []
  }
}
