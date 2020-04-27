import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import { Layout } from '../components/Layout'
import { useOktaAuth } from '@okta/okta-react';

export default function Home() {
  return (

    <Layout>
      <Grid container justify="center">
        <Grid item xs={12} >
          <Paper>
            Hello
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}
