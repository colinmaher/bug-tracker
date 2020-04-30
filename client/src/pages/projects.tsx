import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react'
import Head from '../components/Head'
import Layout from '../components/Layout';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
const useStyles = makeStyles((theme) => ({
  pageTitle: {
    color: theme.textColor,
  },
  main: {
    maxWidth: '90vw',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '100%',
    height: '90%',
  },
  container: {
    height: '90vh',
  },
  projectContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: grey[200],
    color: theme.textColor,
    borderRadius: '5px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}))
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

function Projects() {
  const { authState, authService } = useOktaAuth()
  const classes = useStyles()
  useEffect(() => {

  })
  return (
    <div>
      <Head title="Projects" />
      <Layout>

        <Container className={classes.container}>
          <Box mt={3} mb={3} pl={2}>
            <Typography variant="h5" className={classes.pageTitle}>
              Projects
          </Typography>
          </Box>
          <Box p={2} className={classes.main}>
            <Grid container>
              {projects.map((project) => {
                return (
                  <Grid item xs={12} sm={3}>
                    <Box p={3} m={1} className={classes.projectContainer}>
                      <Typography variant="h5">
                        {project.name}
                      </Typography>
                      <Typography variant="body1">
                        Backlog: {project.backlog}
                      </Typography>
                      <Typography variant="body1">
                        In progress: {project.inProgress}
                      </Typography>
                      <Typography variant="body1">
                        Completed: {project.completed}
                      </Typography>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Container>
      </Layout>
    </div>
  )
}
export default Projects