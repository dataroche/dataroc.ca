'use client'
// Use client to render with localized datetime.

import { PortfolioSummary } from 'lib/api/portfolioSummary'
import dayjs from 'lib/dayjs'

export function LastUpdatedAt({
  portfolioSummary,
}: {
  portfolioSummary: PortfolioSummary | undefined
}) {
  const lastUpdateDayJs =
    portfolioSummary &&
    dayjs.unix(portfolioSummary.timestampS).format('ddd, D MMM YYYY')

  return lastUpdateDayJs ? (
    <p className="italic">{`Last updated: ${lastUpdateDayJs}`}</p>
  ) : (
    <p>
      <span className="h-2 bg-slate-200 rounded w-10" />
    </p>
  )
}
