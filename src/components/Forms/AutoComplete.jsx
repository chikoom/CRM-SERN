import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function ComboBox(props) {
  return (
    <Autocomplete
      id='combo-box-demo'
      options={props.list}
      getOptionLabel={option => option.name}
      style={{ width: 300 }}
      renderInput={params => {
        return (
          <TextField
            onChange={props.update(props.field, params.inputProps.value)}
            {...params}
            label={props.label}
          />
        )
      }}
    />
  )
}
