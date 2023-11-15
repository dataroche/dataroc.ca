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
    <section>
      <PageTitle
        subTitle={<LastUpdatedAt portfolioSummary={portfolioSummary} />}
      >
        Crypto bots performance
      </PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-5">
          Here's a summary of a multi-strategy automated bot engaged in trading
          on Kraken. Over the past 30 days, the bot executed a total of{' '}
          <span className="text-sky">
            {portfolioSummary.tradesCount30d} trades
          </span>
          , accumulating a trading volume of{' '}
          <span className="text-sky">USD {formattedUsdVolume}</span>.
        </p>
        <p className="mb-5">
          Currently, the portfolio consists of{' '}
          <span className="text-sky">
            {marketExposurePct.toFixed(1)}% in cryptocurrencies
          </span>
          , with the remaining portion held in USD. The primary goal is to
          capture 80% of the overall crypto market's upward movements while
          limiting downside exposure to 50%.
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
        <h2 className="my-5">
          Interested in understanding the mechanics behind this page?
        </h2>
        <p className="mb-5">
          The content you see here is the result of several pieces of code
          collaborating seamlessly. Check out my posts that delve into the
          intricacies of how this page operates.
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
            <li>
              <a href="/blog/inserting-data-via-the-postgrest-api-using-python">
                Inserting data via the PostgREST API using Python
              </a>
            </li>
          </ul>
        </p>
        <ContactParagraph />
      </div>
    </section>
  )
}
