import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { green, pink } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'
import { Typography } from '@material-ui/core'

const InfoBadge = props => {
  const classes = useStyles()
  return (
    <div className={classes.badge}>
      <Avatar className={classes.icon}>
        {/* <FolderIcon className={classes.iconInner} /> */}
        {props.icon}
      </Avatar>
      <Typography variant='h4' className={classes.number}>
        50
      </Typography>
      <Typography variant='body2' className={classes.text}>
        {props.title}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  badge: {
    display: 'grid',
    gridTemplateAreas: "'ico num' 'ico num' 'tex tex'",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  icon: {
    gridArea: 'ico',
    width: '60px',
    height: '60px',
    fontSize: '40px',
  },
  iconInner: {
    fontSize: '40px',
  },
  number: {
    gridArea: 'num',
    fontSize: '50px',
  },
  text: {
    gridArea: 'tex',
    fontSize: '15px',
    fontWeight: 900,
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}))

export default InfoBadge
