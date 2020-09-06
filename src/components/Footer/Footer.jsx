import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const Footer = props => {
  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Typography
          component='div'
          style={{
            textAlign: 'center',
            backgroundColor: 'primary.main',
            height: '5vh',
          }}
        >
          Created by Chikoom
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default Footer
