import PageTitle from 'components/page-title'
import { ContactParagraph, LinkedInLink } from 'components/contact'
import PortfolioSummaryLink from 'components/portfolio/portfolio-summary-link'
import { getPortfolioSummaryServerSide } from 'lib/api/portfolioSummary'
import InlineCTAWithArrow from 'components/inline-cta-with-arrow'

export const revalidate = 60

export default async function HomePage() {
  const portfolioSummary = await getPortfolioSummaryServerSide()

  return (
    <section>
      <PageTitle
        subTitle={
          <span className="flex flex-row md:gap-5 flex-wrap">
            <p className="whitespace-nowrap mr-2">Open to work</p>
            <LinkedInLink text="connect on linked in" />
          </span>
        }
      >
        dataroc
      </PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-3">
          Software developer and architect specialized in data-focused
          applications and infrastructure. Ready for my next challenge!
        </p>
        <p className="mb-5">
          As a side-project for the past 2 years, I've been automating market
          making strategies on crypto exchanges.{' '}
        </p>
        <InlineCTAWithArrow arrowText="My market making portfolio">
          <PortfolioSummaryLink portfolioSummary={portfolioSummary} />
        </InlineCTAWithArrow>
        <p className="my-5">
          I love to compile and analyze crypto markets data. My{' '}
          <a
            className="dark:text-sky hover:opacity-70 no-underline"
            href="/blog/how-crypto-exchanges-perform-under-load"
          >
            latest blog
          </a>{' '}
          explores the latency of different crypto exchanges and the
          relationship between the real-time prices of certain symbols.
        </p>
        <h2 className="my-5" id="why-dataroc">
          About me
        </h2>
        <p className="my-5">
          When I'm not coding, I'm probably playing volley ball 🏐, dancing
          salsa 🕺, but (who am I kidding) I'm probably coding. I love to
          travel, meet new people and experience extraordinary food. Latest
          travels: Denmark, the Canary Islands and London.
        </p>
        <h2 className="my-5" id="why-dataroc">
          Why dataroc?
        </h2>
        <p>
          Dataroc is a portmanteau of <span className="text-sky">data</span> and
          part of my last name, La<span className="text-sky">roc</span>he.
        </p>
        <h2 className="my-5" id="why-dataroc">
          What is that avatar/favicon?
        </h2>
        <p>
          The avatar is named SOLeNOID and is the result of the creative genius
          of{' '}
          <a
            className="dark:text-sky underline"
            href="https://twitter.com/Logic_Beach"
          >
            @logicbeach.eth
          </a>
          . It's the only NFT I possess, and proudly so! You can find{' '}
          <a
            className="dark:text-sky underline"
            href="https://opensea.io/collection/logicbots-u1"
          >
            the whole collection here
          </a>
          . It's also the basis of this website's color palette.
        </p>
        <hr className="mt-10" />
        <ContactParagraph />
        <p className="text-sm mt-4">
          <a
            className="dark:text-sky underline"
            href="https://github.com/dataroche/dataroc.ca"
          >
            This website's source code
          </a>{' '}
          is freely available and is based on Lee Robinson's template. My way of
          thanking him is by hosting the website on his platform!
        </p>
      </div>
    </section>
  )
}
