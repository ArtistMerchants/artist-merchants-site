import { useEffect } from 'react'
import localFont from 'next/font/local'
import '../styles/globals.css'
import { VH } from 'components/Global/VH'

const constellation = localFont({
  src: [
    {
      path: '../fonts/Constellation-ASCII.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-constellation',
})

const selfModern = localFont({
  src: [
    {
      path: '../fonts/Self-Modern-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-self-modern',
})

const gerstner = localFont({
  src: [
    {
      path: '../fonts/Gerstner-Programm-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gerstner',
})

function MyApp({ Component, pageProps, router }) {
  return (
    <div
      className={`${constellation.variable} ${selfModern.variable} ${gerstner.variable} ${gerstner.variable} font-sans`}
    >
      <VH />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
