import type { Metadata } from 'next'
import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'

import PageTitle from 'components/page-title'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Elevate your skills with blog posts on SQL, Python, data engineering, and algo trading. Tailored for both experienced and aspiring developers.',
}

export default async function BlogPage() {
  return (
    <section>
      <PageTitle>blog</PageTitle>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4 "
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p>
                <span className="text-sky">{post.title}</span>
              </p>
              <p className="italic">Posted on {post.publishedAt}</p>
            </div>
          </Link>
        ))}
    </section>
  )
}
