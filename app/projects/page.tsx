import type { Metadata } from 'next';

import PageTitle from 'components/page-title';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Some projects I've worked on/I'm working on",
};

export default function UsesPage() {
  return (
    <section>
      <PageTitle>projects</PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <h2 id="computer-office">Automated Crypto Trading Bots</h2>
        <p>
          Started experimenting with liquidity mining on <a href="https://miner.hummingbot.io/">Hummingbot Miner</a> around October 2021.
          Iterations of custom bots built on top of the Pure Market Making strategy led to a steady 0.5% daily return. <a href="/blog/ftx-burn">Until getting burned on a faithful day...</a>
        </p>
        <p>
          Since the summer of 2022, I've been running grid bots and other market making bots for a steady stream of profits.
          The bots have a lower crypto exposure (beta) than a pure holding strategy, while still profiting from market volatility.
          I've built an extensive ecosystem around my bot to visualize trading and profit from market conditions.
        </p>
        <p>Some highlights:</p>
        <ul>
          <li>A custom-built grid trading strategy that can run on any Hummingbot-supported connector</li>
          <li>Streamlit dashboard to monitor profits, visualize trades and run backtests</li>
          <li>Real-time indexing of the BSC chain using <a href="https://ethereum-etl.readthedocs.io/en/latest/">Ethereum ETL</a> and TimescaleDB to compress and retain data</li>
          <li>A backtesting processor to test profitability on of grid bots on Kraken and BSC</li>
        </ul>
      </div>
    </section>
  );
}
