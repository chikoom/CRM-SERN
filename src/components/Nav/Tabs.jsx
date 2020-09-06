import React from 'react'
import { inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useHistory } from 'react-router-dom'

function LinkTab(props) {
  const history = useHistory()
  return (
    <Tab
      component='a'
      onClick={event => {
        event.preventDefault()
        history.push(props.href)
      }}
      {...props}
    />
  )
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export const ScrollableTabs = inject('MainStore')(props => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs'
        >
          {props.MainStore.pageList.map((page, index) => (
            <LinkTab
              href={page.path}
              key={page.id}
              label={page.name}
              {...a11yProps(page.id)}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  )
})
