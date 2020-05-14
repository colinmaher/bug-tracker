import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react'
import Head from '../components/Head'
import Layout from '../components/Layout';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import CreateProjectForm from '../components/CreateProjectForm';

const projects = [
  {
    name: 'Project 1',
    backlog: 10,
    inProgress: 3,
    completed: 12,
    collaborators: [
      {
        icon: ""
      }
    ]
  },
  {
    name: 'Project 2',
    backlog: 13,
    inProgress: 4,
    completed: 5,
    collaborators: [
      {
        icon: ""
      }
    ]
  },
  {
    name: 'Project 3',
    backlog: 6,
    inProgress: 5,
    completed: 20,
    collaborators: [
      {
        icon: ""
      }
    ]
  },
]

// if (breakpoint === '')

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    color: theme.textColor,
    alignSelf: 'flex-start',
    display: 'flex',
  },
  main: {
    maxWidth: '90vw',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '100%',
    // maxHeight: '90%',
    flex: 1,
    // marginBottom: '5em',
  },
  container: {
    height: '100%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectContainer: {
    // width: '100%',
    // margin: '1em',
    padding: '1em',
    // height: '100%',

    backgroundColor: grey[200],
    color: theme.textColor,
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    minHeight: '12em',
    display: 'flex',
    flexDirection: 'column',

  },
  addIcon: {
    backgroundColor: theme.palette.info.main,
    color: grey[200],
    padding: '1em 2em 1em 2em',
    '&:hover': {
      backgroundColor: theme.palette.info.light,
    },
    // float: 'right',
    // position: 'relative',
    // top: '3em',
    // right: '1em'
    marginTop: 'auto',
    marginLeft: 'auto',
  },
  label: {
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'white',
    padding: '.5em',
    whiteSpace: 'nowrap',
    // margin: '.25em',
    // width: '100%',
  },
  backlog: {
    backgroundColor: theme.red,
  },
  inProgress: {
    backgroundColor: theme.palette.info.main,
  },
  completed: {
    backgroundColor: theme.palette.primary.main,
  },

}))


function Projects() {
  const { authState, authService } = useOktaAuth()
  const classes = useStyles()
  const [backdropOpen, setBackDropOpen] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  console.log(authState)
  useEffect(() => {
    // load latest project data from api
  })
  function handleCreateProject() {
    console.log('open backdrop')
    setBackDropOpen(true)
  }
  function handleBackdrop(backdropState: boolean) {
    setBackDropOpen(backdropState)
  }

  const TitleContainer: React.FC = (props) => {
    return matches ?
      <Box mt={3} mb={3} pl={2} className={classes.pageTitle}>
        {props.children}
      </Box> :
      <Box mt={3} mb={3} pl={2} ml={7} className={classes.pageTitle}>
        {props.children}
      </Box>
  }
  return (
    <div>
      <Head title="Projects" />
      <Layout>
        <Container maxWidth="xl" className={classes.container}>
          <TitleContainer>
            <Typography variant="h5">
              Projects
            </Typography>
          </TitleContainer>
          <Box p={2} className={classes.main}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} xl={3} >
                <Paper className={classes.projectContainer}>
                  <Typography variant="h5">
                    Create Project
                  </Typography>
                  <Fab onClick={handleCreateProject} className={classes.addIcon}>
                    <AddIcon />
                  </Fab>
                </Paper>
              </Grid>
              {projects.map((project, idx) => {
                return (
                  <Grid item xs={12} sm={12} md={6} xl={3} key={idx} >
                    <Paper className={classes.projectContainer}>
                      <Typography variant="h5">
                        {project.name}
                      </Typography>
                      {/* TODO make labels responsive */}
                      <Grid container direction="row" spacing={1} style={{ marginTop: 'auto' }}>
                        <Grid item xs={6} sm={4}>
                          <Typography variant="body1" className={`${classes.backlog} ${classes.label}`}>
                            Backlog: {project.backlog}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography variant="body1" className={`${classes.inProgress} ${classes.label}`}>
                            In progress: {project.inProgress}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography variant="body1" className={`${classes.completed} ${classes.label}`}>
                            Completed: {project.completed}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
          <CreateProjectForm open={backdropOpen} setBackdrop={handleBackdrop} />
        </Container >
      </Layout >
    </div >
  )
}
export default Projects