import React, { ReactNode } from 'react'
import { AppProps } from 'next/app'
import { Security } from '@okta/okta-react'
import { config } from '../oktaConfig'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useOktaAuth } from '@okta/okta-react';
import fetch from "cross-fetch"

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    textColor: React.CSSProperties['color'],
    red: React.CSSProperties['color']
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    textColor: React.CSSProperties['color'],
    red: React.CSSProperties['color']
  }
}


function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#738273',
      },
      secondary: {
        main: '#C7CCB3',
      },
      info: {
        main: '#545985'
      },
    },
    ...options,
  })
}

const store = configureStore({
  reducer: rootReducer
})

const theme = createMyTheme({
  textColor: '#757575',
  red: '#825254',
});
type ApolloProps = {
  children: ReactNode
}
function Apollo(props: ApolloProps) {
  const { authState } = useOktaAuth()
  const client = new ApolloClient({
    uri: process.env.API_SERVER !== '' ? process.env.API_SERVER : 'localhost:8080/query',
    fetch,
    request: (operation) => {
      const token = authState.accessToken
      operation.setContext({
        header: {
          authorization: token ? `Bearer ${token}` : ""
        }
      })
    }
  });

  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);



  return (
    <Provider store={store}>
      <Security {...config}>
        <Apollo>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Apollo>
      </Security>
    </Provider>
  )
}


export default App