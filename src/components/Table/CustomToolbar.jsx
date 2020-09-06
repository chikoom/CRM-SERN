import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

// const defaultToolbarStyles = {
//   iconButton: {},
// }

const CustomToolbar = props => {
  const handleClick = () => {
    console.log('clicked on icon!')
  }
  return (
    <>
      <Tooltip title={'custom icon'}>
        <IconButton onClick={props.handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default CustomToolbar

// class CustomToolbar extends React.Component {
//   handleClick = () => {
//     console.log('clicked on icon!')
//   }

//   render() {
//     const { classes } = this.props

//     return (
//       <React.Fragment>
//         <Tooltip title={'custom icon'}>
//           <IconButton className={classes.iconButton} onClick={this.handleClick}>
//             <AddIcon className={classes.deleteIcon} />
//           </IconButton>
//         </Tooltip>
//       </React.Fragment>
//     )
//   }
// }

// export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(
//   CustomToolbar
// )
