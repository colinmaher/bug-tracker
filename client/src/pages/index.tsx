import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Layout from '../components/Layout'
import Head from '../components/Head'
import { useOktaAuth } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
// const Mantis = require('../../public/images/mantis.jpg')

const useStyles = makeStyles((theme) => ({
  jumbotron: {
    height: '100%',
    minHeight: '90vh',
  },
  main: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    maxWidth: 'inherit',
    width: '100%',
    minHeight: '80vh',
    height: '100%',
  },
  description: {
    fontSize: '32px',
    textAlign: 'center',
  },
  demoImgContainer: {
    // padding: '2em 1em 2em 1em',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  demoImg: {
    objectFit: 'contain',
    height: 'auto',
    width: '100%',
    display: 'block',
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainButton: {
    backgroundColor: theme.palette.info.main,
    color: 'white',

    padding: '1em 2em 1em 2em',
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
  },
}))

export default function Home() {
  const classes = useStyles()
  const { authState, authService } = useOktaAuth()
  const router = useRouter()
  function handleCreateNewProject() {
    if (authState.isAuthenticated) {
      router.push('/projects')
    }
    else {
      authService.login('/projects')
    }
  }
  return (
    <div>
      <Head title="Bug Tracker" />
      <Layout >
        <Container maxWidth="lg" className={classes.jumbotron} >
          <Box mt={4} mb={5} p={2} >
            <Grid container className={classes.main}>
              <Grid item sm={12} md={6}>
                <Box p={5}>
                  <Typography className={classes.description}>
                    A simple project management tool for tracking software bugs.
                  </Typography>
                </Box>
                <Box p={7} className={classes.buttonBox}>
                  <Button size="large" variant="contained" className={classes.mainButton} onClick={handleCreateNewProject}>
                    Create a new project
                  </Button>
                </Box>
              </Grid>
              <Grid item md={6} sm={12} >
                <Grid container >
                  <Grid item xs={12} sm={6} className={classes.demoImgContainer} >
                    <Box m={2}>
                      <img src="https://picsum.photos/250/150" alt="Demo Screenshot" className={classes.demoImg} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.demoImgContainer} >
                    <Box m={2}>
                      <img src="https://picsum.photos/250/150" alt="Demo Screenshot" className={classes.demoImg} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.demoImgContainer} >
                    <Box m={2}>
                      <img src="https://picsum.photos/250/150" alt="Demo Screenshot" className={classes.demoImg} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.demoImgContainer} >
                    <Box m={2}>
                      <img src="https://picsum.photos/250/150" alt="Demo Screenshot" className={classes.demoImg} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    </div >
  )
}
