import { PropsWithChildren } from 'react'

export default function InlineCTAWithArrow({
  arrowText,
  children,
  containerClassName,
}: PropsWithChildren<{
  arrowText: string
  containerClassName?: string
}>) {
  return (
    <div
      className={`flex items-center my-8 flex-row ${
        containerClassName ? containerClassName : ''
      }`}
    >
      <div className="space-y-2 text-neutral-500 dark:text-neutral-400">
        {children}
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
      <p className="text-sm">{arrowText}</p>
    </div>
  )
}
