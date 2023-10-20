import { allBlogs } from 'contentlayer/generated'

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://www.dataroc.ca/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }))

  const routes = ['', '/blog', '/projects', '/crypto-bots'].map((route) => ({
    url: `https://www.dataroc.ca${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
