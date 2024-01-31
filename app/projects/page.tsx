import type { Metadata } from 'next'

import { ContactParagraph } from 'components/contact'
import PageTitle from 'components/page-title'
// import PortfolioSummaryLink from 'components/portfolio/portfolio-summary-link'
import { getPortfolioSummaryServerSide } from 'lib/api/portfolioSummary'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Elevate your skills with insights on SQL, Python, data engineering, and algo trading. Tailored for both experienced and aspiring developers.',
}

export default async function UsesPage() {
  // const portfolioSummary = await getPortfolioSummaryServerSide()
  return (
    <section>
      <PageTitle>projects</PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <h2>Automated Crypto Trading Bots</h2>
        {/* <PortfolioSummaryLink portfolioSummary={portfolioSummary} /> */}
        <p>
          Started experimenting with liquidity mining on{' '}
          <a href="https://miner.hummingbot.io/">Hummingbot Miner</a> around
          October 2021. Iterations of custom bots built on top of the Pure
          Market Making strategy led to a steady 0.5% daily return.{' '}
          <a href="/blog/ftx-burn">Until getting burned on a faithful day...</a>
        </p>
        <p>
          Since the summer of 2022, I've been running grid bots and other market
          making bots for a steady stream of profits. The bots have a lower
          crypto exposure (beta) than a pure holding strategy, while still
          profiting from market volatility. I've built an extensive ecosystem
          around hummingbot to visualize trading and profit from market
          conditions.
        </p>
        <p>Some highlights:</p>
        <ul className="marker:text-neutral-200">
          <li>
            A custom-built grid trading strategy that can run on any
            Hummingbot-supported connector
          </li>
          <li>
            Streamlit dashboard to monitor profits, visualize trades and run
            backtests
          </li>
          <li>
            Real-time indexing of the BSC chain using{' '}
            <a href="https://ethereum-etl.readthedocs.io/en/latest/">
              Ethereum ETL
            </a>{' '}
            and TimescaleDB to compress and retain data.
            <br />
            <small>
              Did you know the BSC chain generates 12GB of data per day? 😱
            </small>
          </li>
          <li>
            A backtesting processor to test profitability of grid bots on Kraken
            and BSC
          </li>
        </ul>
        <ContactParagraph />
      </div>
    </section>
  )
}
