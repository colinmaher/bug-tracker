import { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import axios from "axios"
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { useOktaAuth } from '@okta/okta-react';
import FormControl from '@material-ui/core/FormControl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  projectForm: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    minHeight: '50vh',
    minWidth: '30vw',
  },
}))
interface CreateProjectFormProps {
  setBackdrop(state: boolean): void,
  open: boolean
}


function createProject() {

}

function CreateProjectForm(props: CreateProjectFormProps) {
  const classes = useStyles()
  const { authState, authService } = useOktaAuth()
  const [backdropOpen, setBackDropOpen] = useState(false)
  const [project, setProject] = useState({
    name: '',
    nameError: ''
  })

  const CREATE_PROJECT = gql`
    mutation createProject {
      createProject(input:{name: "", userId:"1"}) {
        name
        owner
      }
    }
  `

  useEffect(() => {
    console.log(props.open)
    setBackDropOpen(props.open);
  }, [props.open])

  const ClickAway: React.FC = (props) => {
    return backdropOpen ? <ClickAwayListener onClickAway={handleBackdropClose}>
      {props.children}
    </ClickAwayListener> : <div>{props.children}</div>
  }
  function handleBackdropClose() {
    console.log('close backdrop called')
    props.setBackdrop(false)
    if (backdropOpen) setBackDropOpen(false)
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newProject = project
    newProject.name = e.currentTarget.value
    setProject(newProject)
  }

  function validateProject() {
    const newProject = project
    let valid = true
    if (project.name === '') {
      newProject.nameError = 'Project must have a name'
      valid = false
    } else if (project.name.length >= 64) {
      newProject.nameError = 'Name must have fewer than 64 characters'
      valid = false
    } else {
      newProject.nameError = ''
    }
    setProject(newProject)
    return valid
  }

  function handleFormSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault()

    if (validateProject()) {
      createProject()
    }

    console.log('form submitted')
  }
  return (
    <Backdrop className={classes.backdrop} open={backdropOpen}>
      <ClickAway>
        <Container maxWidth="sm">
          <Card className={classes.projectForm}>
            <FormControl onSubmit={handleFormSubmit}>
              {project.nameError === '' ? <TextField id="outlined-basic" label="Project Name" required variant="outlined" value={project.name} onChange={handleNameChange} /> :
                <TextField id="outlined-basic" label="Project Name" required variant="outlined" value={project.name} onChange={handleNameChange} />}
              <TextField id="outlined-basic" label="Project Name" required variant="outlined" helperText={project.nameError} error value={project.name} onChange={handleNameChange} />
              <Button type="submit" variant="contained" color="primary">Create</Button>
            </FormControl>
          </Card>
        </Container>
      </ClickAway>
    </Backdrop>
  )
}

export default CreateProjectForm