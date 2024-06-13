import PageTitle from 'components/page-title'
import { ContactParagraph, LinkedInLink } from 'components/contact'
import { WittySubtitleText } from 'components/locale-text'

export const revalidate = 60

const Quote = ({
  source,
  children,
}: {
  source: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <q className="mt-5 italic">{children}</q>
      <p className="mt-1 mb-5 text-right">{source}</p>
    </div>
  )
}

export default async function HomePage() {
  return (
    <section>
      <PageTitle
        subTitle={
          <span className="flex flex-row md:gap-5 flex-wrap gap-2">
            <p className="whitespace-nowrap mr-2">
              <WittySubtitleText />
            </p>
            <LinkedInLink text="connect on linked in" />
          </span>
        }
      >
        dataroc
      </PageTitle>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-3">
          Software developer and manager-of-one working as an independant
          contractor. My specialty: scaling exponential growth startups on
          Google Cloud Platform.
        </p>
        <p className="mb-5">
          This website acts as my personal sandbox. As a side-project for the
          past 2 years, I've been automating market making strategies on crypto
          exchanges.{' '}
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
          Testimonials
        </h2>
        <Quote source="Amit, Frontend Dev @ WishRoll Inc.">
          Thanks for all your help being on top of everything this week William,
          this is some of the most fun stress I've had in a while
        </Quote>
        <Quote source="Fai, CEO @ WishRoll Inc.">
          [...] you've helped us grow so much already and we couldn't do it
          without you 😊
        </Quote>
        <Quote source="Vivien, CEO @ The Third Place">
          [William is an] Excellent project manager who is great at getting the
          team organized when it comes to sprint planning
        </Quote>
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
          of <a href="https://twitter.com/Logic_Beach">@logicbeach.eth</a>. It's
          the only NFT I possess, and proudly so! You can find{' '}
          <a href="https://opensea.io/collection/logicbots-u1">
            the whole collection here
          </a>
          . It's also the basis of this website's color palette.
        </p>
        <div className="divider mt-10" />
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
