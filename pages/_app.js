import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { MoralisProvider } from 'react-moralis'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {

  return (
    <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </MoralisProvider>
  )
}

export default MyApp
