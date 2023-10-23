import React from 'react'

import { PortfolioSummary } from 'lib/api/portfolioSummary'

type PercentReturnProps = {
  pctReturn: number
  decimals?: number
}

const PercentReturn = ({ pctReturn, decimals = 1 }: PercentReturnProps) => {
  const pctReturn100 = pctReturn * 100
  const colorClass =
    pctReturn100 >= 0 ? 'dark:text-green-500' : 'dark:text-red-500'

  return (
    <div className={`flex flex-row ${colorClass} gap-1`}>
      {pctReturn > 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {pctReturn100.toFixed(decimals)}%
    </div>
  )
}

export default function PortfolioSummaryLink({
  portfolioSummary,
}: {
  portfolioSummary: PortfolioSummary
}) {
  return (
    <a className="cta-container" href="/crypto-bots">
      <div className={`${portfolioSummary ? '' : 'animate-pulse'} cta-box`}>
        <div className="flex flex-row items-center justify-between text-sm uppercase">
          <div>Bots perf.</div>
          {portfolioSummary ? (
            <div>${portfolioSummary.usdTotalValue.toFixed(0)}</div>
          ) : (
            <div className="h-2 bg-slate-200 rounded w-10" />
          )}
        </div>
        <div className="flex flex-row items-center justify-between h-6">
          {portfolioSummary ? (
            <>
              <div className="text-sm">week</div>
              <div>
                <PercentReturn pctReturn={portfolioSummary.intervalPctReturn} />
              </div>
            </>
          ) : (
            <div className="h-2 bg-slate-200 rounded w-full" />
          )}
        </div>
      </div>
    </a>
  )
}
