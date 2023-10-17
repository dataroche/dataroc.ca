import { ImageResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')
  const font = fetch(
    new URL('../../public/fonts/FragmentMono-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
  const fontData = await font

  const imageHost = 'https://dataroc.ca'
  const imageUrl = imageHost + (postTitle ? '/og-bg-title.png' : '/og-bg.png')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundColor: '#3c4c65',
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            marginBottom: 300,
            display: 'flex',
            fontSize: 80,
            fontFamily: 'Fragment Mono',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: '#93fee2',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Fragment Mono',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
