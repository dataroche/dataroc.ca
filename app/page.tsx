import PageTitle from 'components/page-title'
import { ContactParagraph, LinkedInLink } from 'components/contact'
import PortfolioSummaryLink from 'components/portfolio/portfolio-summary-link'

export const revalidate = 60

export default async function HomePage() {
    return (
        <section className="max-w-[600px]">
            <PageTitle
                subTitle={
                    <span className="flex flex-row gap-5">
                        <p>Crypto markets analytics</p>
                        <LinkedInLink />
                    </span>
                }
            >
                dataroc
            </PageTitle>
            <p className="mb-5">
                Software developer and data enthousiast specialized in
                cryptocurrency markets. My core coding principles: decoupling,
                reusability and quality.
            </p>
            <div className="flex items-center my-8 flex-row">
                <div className="space-y-2 text-neutral-500 dark:text-neutral-400">
                    <ul className="flex flex-row items-center gap-2 space-x-4 space-y-0 font-sm text-neutral-500 ">
                        <li>
                            <PortfolioSummaryLink />
                        </li>
                    </ul>
                </div>

                <span className="mx-4 inline text-neutral-500 dark:text-neutral-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6  inline"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </span>
                <p className="text-sm">My market making portfolio</p>
            </div>
            <p className="my-5">
                I love to compile and analyze markets data. My{' '}
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
                When I'm not coding, I'm probably playing volley ball 🏐,
                dancing salsa 🕺, but (who am I kidding) I'm probably coding. I
                love to travel, meet new people and experience extraordinary
                food. Next up: Denmark!
            </p>
            <h2 className="my-5" id="why-dataroc">
                Why dataroc?
            </h2>
            <p>
                Dataroc is a portmanteau of{' '}
                <span className="text-sky">data</span> and part of my last name,
                La<span className="text-sky">roc</span>he.
            </p>
            <h2 className="my-5" id="why-dataroc">
                What is that avatar/favicon?
            </h2>
            <p>
                The avatar is named SOLeNOID and is the result of the creative
                genius of{' '}
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
                is freely available and is based on Lee Robinson's template. My
                way of thanking him is by hosting the website on his platform!
            </p>
        </section>
    )
}
