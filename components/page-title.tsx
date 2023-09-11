import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  subTitle?: ReactNode
}

export default function PageTitle({ children, subTitle }: Props) {
  return (
    <div className="mb-5">
      <h1>
        {children}
        <span className="blink-prompt">
          <svg
            width="0.9ch"
            height="1.1em"
            style={{
              display: 'inline-flex',
              marginLeft: '2px',
              verticalAlign: 'sub',
            }}
          >
            <rect
              width="0.9ch"
              height="1.1em"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2}
            />
          </svg>
        </span>
      </h1>
      {subTitle}
    </div>
  )
}
