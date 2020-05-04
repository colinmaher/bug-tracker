import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useOktaAuth } from '@okta/okta-react';
import Box from "@material-ui/core/Box"
import Link from 'next/link'
import { findByLabelText } from "@testing-library/react"
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonMobile: {

  },
  title: {
    minWidth: '10vw',
    marginLeft: theme.spacing(2),
  },
  mobileTitle: {
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    width: '100%',
  },
  header: {
    height: '10vh',
    background: '#738273',
    color: '#B6CCCB'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Header: React.FC = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const { authState, authService } = useOktaAuth()
  const login = () => authService.login('/')
  const logout = () => authService.logout('/')
  const TitleContainer: React.FC = (props) => {
    return matches ? <Box pl={2} className={classes.mobileTitle}>{props.children}</Box>
      : <Box className={classes.title}>{props.children}</Box>
  }
  return (
    <AppBar position="static">
      <Toolbar>
        {matches ? <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
          : <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>}

        <Link href="/">
          <a className={classes.iconContainer}>
            {matches ? <img src="/images/transparentBug.png" height="36" width="36" alt="Bug logo" />
              : <img src="/images/transparentBug.png" height="48" width="48" alt="Bug logo" />}
          </a>
        </Link>
        <TitleContainer>
          <Typography variant="h6" >
            Bug Tracker
          </Typography>
        </TitleContainer>

        <Box style={{
          marginLeft: 'auto',
        }}>
          {authState.isAuthenticated ? <Button color="inherit" onClick={logout}>Logout</Button> : <Button color="inherit" onClick={login}>Login</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const Footer: React.FC = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Copyright © Bug Tracker 2020
        </Typography>
      </Container>
    </footer>
  );
}



const Layout: React.FC = (props) => {
  const classes = useStyles()
  return (
    <div >
      <Header />
      <main className={classes.main}>
        {props.children}

      </main>
      <Footer />
    </div>
  )
}
export default Layout