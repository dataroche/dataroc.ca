import Image from 'next/image';
import PageTitle from 'components/page-title';
import { LinkedInLink } from 'components/contact';
import PortfolioSummaryLink from 'components/portfolio/portfolio-summary-link';
import avatar from '../public/profile-square.jpg';


export const revalidate = 60;

export default async function HomePage() {

  return (
    <section className="max-w-[600px]">
      <PageTitle subTitle={(
        <p>
          <a className="dark:text-sky" href="#why-dataroc">
            (dataroc)
          </a>
        </p>
      )}>
        william laroche
      </PageTitle>
      <p className="mb-5">
        Hey, I'm an electrical engineering graduate turned software dev.
        Currently building software to help local businesses build a sense
        of home and community <a className="dark:text-sky underline" href="https://thethirdplace.is" target="_blank">@thethirdplace</a>.
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt="Picture of William Laroche"
          className="rounded-full"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
          {/* <h2>Expertise</h2> */}
          <p>5+ years of backend <span className="dark:text-sky">Python</span> experience</p>
          <p>Business intelligence and analytics engineering</p>
          <p>Algorithmic crypto trading using <a className="dark:text-sky underline" href="/projects">Hummingbot</a></p>
        </div>
      </div>
      <ul className="flex flex-col items-center md:flex-row gap-2 mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 ">
        <li>
          <PortfolioSummaryLink />
        </li>
        <li>
          <LinkedInLink />
        </li>
      </ul>
      <p className="my-5">
        When I'm not coding, I'm probably playing volley ball 🏐, dancing salsa 🕺, but (who am I kidding) I'm probably coding. I love to travel, meet new people and experience extraordinary food. Next up: Denmark!
      </p>
      <h2 className="my-5" id="why-dataroc">
        Why dataroc?
      </h2>
      <p>
        Dataroc is a portmanteau of <span className="text-sky">data</span> and part of my last name, La<span className="text-sky">roc</span>he :-)
      </p>
      <h2 className="my-5" id="why-dataroc">
        What is that avatar/favicon?
      </h2>
      <p>
        The avatar is named SOLeNOID and is the result of the creative genius of <a className="dark:text-sky underline" href="https://twitter.com/Logic_Beach">@logicbeach.eth</a>. It's the only NFT I possess, and proudly so!
        You can find <a className="dark:text-sky underline" href="https://opensea.io/collection/logicbots-u1">the whole collection here</a>. It's also the inspiration of this website's color palette!
      </p>
      <hr className="my-10" />
      <p className="italic font-light">
        <a className="dark:text-sky underline" href="https://github.com/dataroche/dataroc.ca">This website's source code</a> is
        freely available and is based on Lee Robinson's template.
        My way of thanking him is by hosting the website on his platform :-)
      </p>
    </section>
  );
}
