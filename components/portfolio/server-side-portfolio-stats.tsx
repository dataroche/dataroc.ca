'use client'
// Use client to render with localized datetime.

import { PortfolioSummary } from 'lib/api/portfolioSummary'
import dayjs from 'lib/dayjs'

export function LastUpdatedAt({
  portfolioSummary,
}: {
  portfolioSummary: PortfolioSummary
}) {
  const lastUpdateDayJs =
    portfolioSummary && dayjs.unix(portfolioSummary.updatedAtS)

  const formatted = lastUpdateDayJs.fromNow()
  // lastUpdateDayJs && lastUpdateDayJs.format('ddd, D MMM YYYY [at] h:mm A')

  return lastUpdateDayJs ? (
    <p className="italic">{`Last updated ${formatted}`}</p>
  ) : (
    <p>
      <span className="h-2 bg-slate-200 rounded w-10" />
    </p>
  )
}
