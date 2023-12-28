import { allBlogs, Blog } from 'contentlayer/generated'
import Link from 'next/link'

const PROJECT_PALETTE = ['#a4b6dd', '#d09292', '#c094cc', '#a2d0c0', '#c37892']

const TECH_PALETTE = ['#2d5b6b', '#c47a53', '#8f4731', '#52494c', '#7b7d2a']

export const TAGS = [
  {
    key: 'crypto-bots',
    label: 'Project: Crypto bots',
    color: PROJECT_PALETTE[0],
  },
  {
    key: 'dataroc.ca',
    label: 'Project: dataroc.ca',
    color: PROJECT_PALETTE[1],
  },
  {
    key: 'wishroll',
    label: 'Project: WishRoll',
    color: PROJECT_PALETTE[2],
  },
  {
    key: 'python',
    label: 'Python',
    color: TECH_PALETTE[0],
  },
  {
    key: 'sql',
    label: 'SQL',
    color: TECH_PALETTE[1],
  },
]

export const TagChip = ({ tagKey }: { tagKey: string }) => {
  const tagData = TAGS.find((tag) => tag.key === tagKey)
  if (tagData) {
    return (
      <span
        className={`rounded-xl py-1 px-2 mr-1`}
        style={{ backgroundColor: tagData.color }}
      >
        {tagData.label}
      </span>
    )
  } else {
    return null
  }
}

export const TagSerieCarousel = ({
  tagKey,
  thisPostSlug,
}: {
  tagKey: string
  thisPostSlug: string
}) => {
  const postsInSerie = allBlogs.filter(
    (blog) => blog.tags && blog.tags.includes(tagKey)
  )
  const indexOfThisPost = postsInSerie.findIndex(
    (blog) => blog.slug === thisPostSlug
  )

  let previousPost, nextPost: Blog | undefined

  if (indexOfThisPost >= 0 && indexOfThisPost + 1 < postsInSerie.length) {
    nextPost = postsInSerie[indexOfThisPost + 1]
  }

  if (indexOfThisPost >= 1) {
    previousPost = postsInSerie[indexOfThisPost - 1]
  }

  return (
    <div className="flex flex-col">
      <div>
        More related to <TagChip tagKey={tagKey} />
      </div>
      <div className="w-full flex flex-row">
        {previousPost && (
          <Link
            key={previousPost.slug}
            className="w-1/2"
            href={`/blog/${previousPost.slug}`}
          >
            {previousPost.title}
          </Link>
        )}
        {nextPost && (
          <Link
            key={nextPost.slug}
            className="w-1/2"
            href={`/blog/${nextPost.slug}`}
          >
            {nextPost.title}
          </Link>
        )}
      </div>
    </div>
  )
}

export const createTagSerieCarousel = ({
  slug,
  tags,
}: {
  slug: string
  tags?: string[]
}) => {
  return ({ tagKey }: { tagKey?: string }) => {
    const finalTagKey = tagKey || (tags && tags[0])
    if (finalTagKey) {
      return <TagSerieCarousel tagKey={finalTagKey} thisPostSlug={slug} />
    } else return null
  }
}
