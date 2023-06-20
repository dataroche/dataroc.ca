import PageTitle from 'components/page-title';
import { ContactParagraph } from 'components/contact';
import PortfolioHistory from 'components/portfolio/portfolio-history';

export default function UsesPage() {
  return (
    <section className="max-w-[600px]">
      <PageTitle subTitle={<p className="italic">Updated daily</p>}>Crypto bots performance</PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-5">
          This is an overview of a multi-strategy automated bot trading on Kraken.
          The bot makes an average of 100 trades a day on 2-3 token pairs.
          Trading volume is in the ballpark of USD $100k per month.
        </p>
        <p className="mb-5">
          Its objective: capturing 80% of the broad crypto market upside while capping downside exposure to 50%.
        </p>
        <h2 className="my-5">
          Weekly performance history
        </h2>
        <div className="prose prose-neutral dark:prose-invert">
          <PortfolioHistory />
        </div>
        <h2 className="my-5">
          Want to see more?
        </h2>
        <p className="mb-5">
          This page is a work-in-progress. It's the end product of multiple pieces of
          code working together! If you're curious of the technical challenges
          behind this page, <a href="/blog/introducing-bots-perf">head over here</a>.
        </p>
        <ContactParagraph />
      </div>
    </section>
  );
}
