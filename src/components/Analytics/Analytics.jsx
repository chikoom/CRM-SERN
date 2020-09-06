import React from 'react'
import SalesBy from './SalesBy'
import TopEmployee from './TopEmployee'
import SalesSince from './SalesSince'
import InfoBadge from './InfoBadge'
import LanguageIcon from '@material-ui/icons/Language'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import './analytics.css'
import { makeStyles } from '@material-ui/core/styles'

const Analytics = props => {
  const classes = useStyles()
  return (
    <div className='page-analytics'>
      <div className={classes.badges}>
        <div className={classes.badgesInner}>
          <InfoBadge
            title='Standing Clients'
            icon={<SentimentDissatisfiedIcon />}
          />
          <InfoBadge title='Last 30 Days New' icon={<InsertEmoticonIcon />} />
        </div>
        <div className={classes.badgesInner}>
          <InfoBadge title='Last 30 Days Sales' icon={<MonetizationOnIcon />} />
          <InfoBadge
            title='Hotest Country'
            icon={<LanguageIcon className='icon-inner' />}
          />
        </div>
      </div>
      <div className='analytics-charts-area'>
        <div className='analytics-charts-top-employee'>
          <TopEmployee />
        </div>
        <div className='analytics-charts-sales-by'>
          <SalesBy />
        </div>
        <div className='analytics-charts-sales-since'>
          <SalesSince />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  badges: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  badgesInner: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flex: '1',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export default Analytics
