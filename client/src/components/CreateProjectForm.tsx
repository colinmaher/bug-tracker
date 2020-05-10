import { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
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
function CreateProjectForm(props: CreateProjectFormProps) {
  const classes = useStyles()
  const [backdropOpen, setBackDropOpen] = useState(false)
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
  function handleFormSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault()

    console.log('form submitted')
  }
  return (
    <Backdrop className={classes.backdrop} open={backdropOpen}>
      <ClickAway>
        {/* <ClickAwayListener onClickAway={handleBackdropClose}> */}
        <Container maxWidth="sm">
          <Card className={classes.projectForm}>
            <FormControl onSubmit={handleFormSubmit}>
              <TextField id="outlined-basic" label="Project Name" required variant="outlined" />
              <Button type="submit" variant="contained" color="primary">Create</Button>
            </FormControl>
          </Card>
        </Container>
        {/* </ClickAwayListener> */}
      </ClickAway>
    </Backdrop>
  )
}

export default CreateProjectForm