import Link from 'next/link'
import { Logo } from './Logo'

export const HeaderWrapper = ({ children }) => {
  return (
    <header
      className={`relative left-0 top-0 z-[2] flex w-full items-start justify-between gap-20 pl-20 pt-20 text-body md:grid md:w-[calc(calc(100%/9)*4)] md:grid-cols-4 md:gap-10 md:pl-32 md:pt-32`}
    >
      <div aria-hidden className="w-40"></div>
      <Link
        className="fixed left-20 top-20 md:left-32 md:top-32"
        href="/"
        aria-hidden
      >
        <Logo className="h-auto w-40 md:w-52" />
      </Link>
      <nav
        className={`grid w-full grid-cols-2 gap-10 [--y-from:-20px] md:col-span-3 md:grid-cols-3 md:[--y-from:-50px]`}
      >
        {children}
      </nav>
    </header>
  )
}
