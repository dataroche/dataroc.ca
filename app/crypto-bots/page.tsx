import PageTitle from 'components/page-title'
import { ContactParagraph } from 'components/contact'
import PortfolioHistory from 'components/portfolio/portfolio-history'

import { getPortfolioSummaryServerSide } from 'lib/api/portfolioSummary'
import { USD_FORMATTER_NO_CENTS } from 'lib/intl'

import { LastUpdatedAt } from 'components/portfolio/server-side-portfolio-stats'

export default async function CryptoBotsPage() {
  const notes = [
    {
      date: '2023-05-29',
      title: '1',
      text: 'Attempted a new strategy with poor results in the following 2 weeks.',
    },
    {
      date: '2023-07-19',
      title: '2',
      text: 'Noticed price oracle for ETH-USD had been reporting prices about 25% under their real value for 1 month or so. The portfolio value serie was adjusted here which explains the sudden rise.',
    },
  ]

  const portfolioSummary = await getPortfolioSummaryServerSide()

  const marketExposurePct =
    100 * (1 - portfolioSummary.usdHeld / portfolioSummary.usdTotalValue)

  const formattedUsdVolume = USD_FORMATTER_NO_CENTS.format(
    portfolioSummary.usdRolling30dVolume
  )

  return (
    <section className="max-w-[600px]">
      <PageTitle
        subTitle={<LastUpdatedAt portfolioSummary={portfolioSummary} />}
      >
        Crypto bots performance
      </PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-5">
          This is an overview of a multi-strategy automated bot trading on
          Kraken. In the last 30 days, the bot made a total of{' '}
          <span className="text-sky">
            {portfolioSummary.tradesCount30d} trades
          </span>{' '}
          totalizing <span className="text-sky">USD {formattedUsdVolume}</span>{' '}
          in volume.
        </p>
        <p className="mb-5">
          At the moment, the portfolio is composed of{' '}
          <span className="text-sky">
            {marketExposurePct.toFixed(1)}% crypto
          </span>
          , while the rest is held in USD. Its objective: capturing 80% of the
          broad crypto market upside while capping downside exposure to 50%.
        </p>
        <h2 className="my-5">Weekly performance history</h2>
        {/* For some reason using the tailwind CSS does 
        not work here for the responsive chart */}
        <div style={{ height: '500px' }}>
          <div className="prose prose-neutral dark:prose-invert h-full">
            <PortfolioHistory
              notes={notes.map(({ date, title }) => ({
                date,
                description: title,
              }))}
            />
          </div>
        </div>
        <div className="text-xs">
          {notes.map((note) => (
            <p id={note.date}>
              <span className="text-sky text-[0.8em] mr-2 align-super">
                {note.title}
              </span>
              {note.text}
            </p>
          ))}
        </div>
        <h2 className="my-5">Want to learn on this page works?</h2>
        <p className="mb-5">
          This page is the end product of multiple pieces of code working
          together! I have some posts that explains how this page works:
          <ul>
            <li>
              <a href="/blog/introducing-bots-perf">
                Overview of the architecture
              </a>
            </li>
            <li>
              <a href="/blog/using-postgrest-as-an-sql-defined-api">
                Using PostgREST as an SQL-defined API
              </a>
            </li>
          </ul>
        </p>
        <ContactParagraph />
      </div>
    </section>
  )
}
