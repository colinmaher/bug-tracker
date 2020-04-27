import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Security } from '@okta/okta-react'
import { config } from '../oktaConfig'


function App({ Component, pageProps }: AppProps) {


  return (
    <div>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Security {...config}>
        <Component {...pageProps} />
      </Security>
    </div>
  )
}


export default App