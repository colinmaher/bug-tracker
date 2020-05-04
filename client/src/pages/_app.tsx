import React from 'react'
import { AppProps } from 'next/app'
import { Security } from '@okta/okta-react'
import { config } from '../oktaConfig'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

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
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Security>
    </Provider>
  )
}


export default App