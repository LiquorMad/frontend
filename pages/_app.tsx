import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className='mainContainer pt-20 px-10'>
        <AuthProvider>
          <Navbar/>
            <Component {...pageProps} />
          <Footer/>
        </AuthProvider>
      </div>
    )
}
