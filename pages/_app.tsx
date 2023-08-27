import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className='mainContainer pt-20 px-10'>
        <Navbar/>
          <Component {...pageProps} />
        <Footer/>
      </div>
    )
}
