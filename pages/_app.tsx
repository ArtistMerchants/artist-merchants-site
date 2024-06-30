import localFont from 'next/font/local'

import { VH } from 'components/Global/VH'
import { Layout } from 'components/Layout'

import '../styles/globals.css'

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

export const gerstner = localFont({
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

function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`${constellation.variable} ${selfModern.variable} ${gerstner.variable} ${gerstner.variable} font-sans`}
    >
      <VH />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default MyApp
