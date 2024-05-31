import type { Metadata } from 'next'

import { ContactParagraph } from 'components/contact'
import PageTitle from 'components/page-title'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Elevate your skills with insights on SQL, Python, data engineering, and algo trading. Tailored for both experienced and aspiring developers.',
}

const ProjectHeader = ({
  dateRange,
  projectNote,
  children,
}: {
  dateRange: string
  projectNote: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <h2 className="mb-0">{children}</h2>
      <p className="whitespace-nowrap mr-2">
        {projectNote} • {dateRange}
      </p>
    </div>
  )
}

const ProjectStatusAI = () => (
  <div>
    <ProjectHeader
      dateRange="Oct 2023 to Jan 2024"
      projectNote="Client: WishRoll Inc."
    >
      Status AI
    </ProjectHeader>
    <p>
      Status AI was a mobile app allowing anyone to chat with any persona,
      similar to what{' '}
      <a href="https://character.ai/" rel="noopener noreferrer" target="_blank">
        character.ai
      </a>{' '}
      offers.
    </p>
    <p>
      Joined the team urgently as a consultant to fix scaling issues. The app
      was gaining thousands of users daily and the backend and database were not
      enjoying the ride, to say the least.
    </p>
    <ul>
      <li>
        Within 3 days, I had identified and fixed the most pressing issues
        related to the PostgreSQL database. In turn, this reduced monthly
        expenses by $12k.
      </li>
      <li>
        Within 3 weeks, I completely refactored the worker architecture to
        leverage Cloud Tasks instead of a custom implementation based on Redis.
        This also included a new worker service. This fixed a recurring issue
        where a peak of users would flood our Redis instance and essentially
        shut down our backend jobs queue.
      </li>
      <li>
        Added error reporting and monitoring capabilities using Sentry, GCP
        Monitoring and custom dashboards on Retool.
      </li>
    </ul>
    <p>
      As this project came to an end, I became the sole backend developer as the
      other two team members focused on frontend.
    </p>
  </div>
)

const ProjectCryptoBots = () => (
  <div>
    <ProjectHeader
      dateRange="Oct 2021 to May 2024"
      projectNote="Personal project"
    >
      Automated Crypto Trading Bots
    </ProjectHeader>
    <p>
      Started experimenting with liquidity mining on{' '}
      <a href="https://miner.hummingbot.io/">Hummingbot Miner</a> around October
      2021. Iterations of custom bots built on top of the Pure Market Making
      strategy led to a steady 0.5% daily return.{' '}
      <a href="/blog/ftx-burn">Until getting burned on a faithful day...</a>
    </p>
    <p>
      Since the summer of 2022, I've been running grid bots and other market
      making bots for a steady stream of profits. The bots have a lower crypto
      exposure (beta) than a pure holding strategy, while still profiting from
      market volatility. I've built an extensive ecosystem around hummingbot to
      visualize trading and profit from market conditions.
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
        A backtesting processor to test profitability of grid bots on Kraken and
        BSC
      </li>
    </ul>
  </div>
)

export default async function UsesPage() {
  return (
    <section>
      <PageTitle>projects</PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <ProjectStatusAI />
        <ProjectCryptoBots />
      </div>
      <ContactParagraph />
    </section>
  )
}
