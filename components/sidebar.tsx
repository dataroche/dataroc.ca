'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutGroup, motion } from 'framer-motion'

import solenoid from '../public/SOLeNOID_small.png'

const navItems = {
  '/': {
    name: 'home',
  },
  '/projects': {
    name: 'projects',
  },
  '/crypto-bots': {
    name: 'bots',
  },
  '/blog': {
    name: 'blog',
  },
}

function Logo() {
  return (
    <Link aria-label="Dataroc" href="/">
      <Image
        src={solenoid}
        alt="Dataroc SOLeNOID"
        width={64}
        height={64}
        quality={95}
        style={{ borderRadius: '20%' }}
      />
    </Link>
  )
}

export default function Navbar() {
  let pathname = usePathname() || '/'
  if (pathname.includes('/blog/')) {
    pathname = '/blog'
  }

  return (
    <aside className="dark md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 ">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row md:flex-col items-center md:items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative flex-wrap"
            id="nav"
          >
            <div className="mb-2 px-4 md:px-0 md:mb-8 space-y-2 flex flex-col md:flex-row items-start ">
              <Logo />
            </div>
            <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      'transition-all hover:text-black flex align-middle',
                      {
                        'text-slate-500 font-bold': isActive,
                        'text-white': !isActive,
                      }
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 bg-blue dark:bg-sky rounded-md z-[-1]"
                          layoutId="sidebar"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  )
}
