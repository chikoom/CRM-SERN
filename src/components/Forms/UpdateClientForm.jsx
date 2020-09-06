import React from 'react'
import ComboBox from './AutoComplete'
import { inject, observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { MenuItem, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const UpdateClientForm = inject(
  'FormsStore',
  'WorkersStore',
  'ClientsStore'
)(
  observer(props => {
    const handleChange = event => {
      console.log(event.target.value)
      const { name, value } = event.target
      props.FormsStore.updateField(name, value)
    }
    const classes = useStyles()

    return (
      <form className={classes.root} noValidate autoComplete='off'>
        <Typography variant='h5' gutterBottom>
          Update Client
        </Typography>
        <div>
          <TextField
            required
            id='client-first-name'
            label='Client First Name'
            onChange={handleChange}
            name='enteredFirstName'
            value={props.FormsStore.enteredFirstName}
          />
        </div>
        <div>
          <TextField
            required
            id='client-last-name'
            label='Client Last Name'
            onChange={handleChange}
            name='enteredLastName'
            value={props.FormsStore.enteredLastName}
          />
        </div>
        <div>
          <TextField
            required
            id='client-email'
            label='Client Email'
            onChange={handleChange}
            name='enteredEmail'
            value={props.FormsStore.enteredEmail}
          />
        </div>
        <div>
          <TextField
            required
            id='client-phone'
            label='Client Phone'
            onChange={handleChange}
            name='enteredPhone'
            value={props.FormsStore.enteredPhone}
          />
        </div>

        <div>
          <ComboBox
            list={props.FormsStore.countries}
            update={props.FormsStore.updateField}
            field={'selectedCountry'}
            label={'Select Country'}
          />
        </div>
        <div>
          <ComboBox
            list={props.WorkersStore.workersList.map(worker => ({
              name: `${worker.firstName} ${worker.lastName}`,
            }))}
            update={props.FormsStore.updateField}
            field={'selectedWorker'}
            label={'Asign Worker'}
          />
        </div>
        <Button variant='contained' color='primary'>
          Save Client
        </Button>
      </form>
    )
  })
)

export default UpdateClientForm
