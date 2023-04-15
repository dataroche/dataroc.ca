import Link from 'next/link';
import Image from 'next/image';
// import { getBlogViews, getTweetCount, getStarCount } from 'lib/metrics';
import {
  ArrowIcon,
  GitHubIcon,
  TwitterIcon,
  ViewsIcon,
} from 'components/icons';
import PageTitle from 'components/page-title';
import avatar from '../public/profile-square.jpg';
import { about, bio } from 'lib/info';

export const revalidate = 60;

export default async function HomePage() {
  let starCount, views, tweetCount;

  // try {
  //   [starCount, views, tweetCount] = await Promise.all([
  //     getStarCount(),
  //     getBlogViews(),
  //     getTweetCount(),
  //   ]);
  // } catch (error) {
  //   console.error(error);
  // }

  return (
    <section className="max-w-[600px]">
      <PageTitle>William Laroche</PageTitle>
      <p className="italic"><a className="dark:text-sky underline" href="#why-dataroc">(dataroc*)</a></p>
      <p className="my-5">
        Hey, I'm an electrical engineering graduate turned software dev. Currently building the local business user community??? <a className="dark:text-sky underline" href="https://thethirdplace.is" target="_blank">@thethirdplace</a>
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
          <p>Algorithmic crypto trading using <a className="dark:text-sky underline" href="https://hummingbot.org/" target="_blank" rel="noopener noreferrer">Hummingbot</a></p>
          {/* <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/leeerob"
            className="flex items-center gap-2"
          >
            <TwitterIcon />
            {`${tweetCount.toLocaleString()} tweets all time`}
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/leerob"
            className="flex items-center gap-2"
          >
            <GitHubIcon />
            {`${starCount.toLocaleString()} stars on this repo`}
          </a>
          <Link href="/blog" className="flex items-center">
            <ViewsIcon />
            {`${views.toLocaleString()} blog views all time`}
          </Link> */}
        </div>
      </div>
      <p className="my-5">
        {bio()}
      </p>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-sky hover:opacity-70">
        <li>
          <a
            className="flex items-center transition-all "
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/william-laroche/?locale=en_US"
          >
            <ArrowIcon />
            <p className="h-7 dark:text-sky">linked in</p>
          </a>
        </li>
      </ul>
      <h2 className="my-5" id="why-dataroc">
        Why dataroc?
      </h2>
      <p>
        Dataroc is a portmanteau of <span className="text-sky">data</span> and part of my last name, La<span className="text-sky">roc</span>he :-)
      </p>
    </section>
  );
}
