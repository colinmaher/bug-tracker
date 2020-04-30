import { makeStyles } from "@material-ui/core/styles"
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    minWidth: '10vw'
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
}));

const Header: React.FC = (props) => {
  const classes = useStyles()
  const { authState, authService } = useOktaAuth()
  const login = () => authService.login('/')
  const logout = () => authService.logout('/')
  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img src="/images/transparentBug.png" height="48" width="48" alt="Bug logo" />
          </a>
        </Link>
        <Box pl={2} className={classes.title}>
          <Typography variant="h6" >
            Bug Tracker
          </Typography>
        </Box>
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
      {props.children}
      <Footer />
    </div>
  )
}
export default Layout