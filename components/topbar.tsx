'use client'

import { useState, useEffect } from 'react'

const INITIAL_SHOW_TIMER = 800

const useShouldShowTopbar = () => {
  const [y, setY] = useState(0)
  const [shouldShow, setShouldShow] = useState(false)

  const handleScroll = (e) => {
    const window = e.currentTarget

    const isBottom =
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight

    console.log(isBottom)
    const delta = window.scrollY - y
    setShouldShow(window.scrollY < 50 || delta < 0 || isBottom)
    setY(window.scrollY)
  }

  // When the scroll changes
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [y])

  // For initial timer to show the topbar after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShouldShow(true), INITIAL_SHOW_TIMER)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return shouldShow
}

export default function Topbar() {
  const shouldShow = useShouldShowTopbar()

  return (
    <>
      <div className="min-h-[50px]"> </div>
      <div
        className={`transition ease-in-out delay-150 fixed w-full full-bleed top-0 py-2 px-4 bg-sky text-center align-middle flex z-20 justify-center hover:opacity-80 ${
          shouldShow ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex column items-center gap-1">
          <a href="https://dataroc.curated.co/">
            Get a curated dose of SQL and Python articles every month. Subscribe
            to the newsletter!
          </a>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </span>
        </div>
      </div>
    </>
  )
}
