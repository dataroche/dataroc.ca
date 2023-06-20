import type { Metadata } from 'next';

import PageTitle from 'components/page-title';
import PortfolioHistory from 'components/portfolio/portfolio-history';

export default function UsesPage() {
  return (
    <section>
      <PageTitle subTitle={<p className="italic">Updated daily</p>}>Crypto bots performance</PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <PortfolioHistory />
      </div>
    </section>
  );
}
