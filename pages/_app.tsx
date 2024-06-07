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

function MyApp({ Component, pageProps, router }) {
  return (
    <div className={`${constellation.variable}`}>
      <VH />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
