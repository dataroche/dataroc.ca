import type { Metadata } from 'next';
import Link from 'next/link';
import { allBlogs } from 'contentlayer/generated';
import ViewCounter from './view-counter';

import PageTitle from 'components/page-title';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  return (
    <section>
      <PageTitle>Blog</PageTitle>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="my-5 w-full flex flex-col">
              <p>{post.title}</p>
              <ViewCounter slug={post.slug} trackView={false} />
            </div>
          </Link>
        ))}
    </section>
  );
}
