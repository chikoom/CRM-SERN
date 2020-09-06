import React from 'react'
import AddClientForm from '../Forms/AddClientForm'
import UpdateClientForm from '../Forms/UpdateClientForm'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(3),
    maxWidth: '400px',
    '& > *': {
      padding: theme.spacing(3),
      margin: theme.spacing(3),
    },
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const Actions = inject('ClientsStore')(
  observer(props => {
    const classes = useStyles()
    return (
      <div className={`page-actions ${classes.flex}`}>
        <div className='page-actions-add-Client'>
          <Paper elevation={3} className={classes.root}>
            <AddClientForm />
          </Paper>
        </div>
        <div className='page-actions-add-Client'>
          <Paper elevation={3} className={classes.root}>
            <UpdateClientForm />
          </Paper>
        </div>
      </div>
    )
  })
)

export default Actions
