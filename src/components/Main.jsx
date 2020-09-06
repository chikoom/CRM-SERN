import React from 'react'
import { Route } from 'react-router-dom'
import { inject } from 'mobx-react'
import Container from '@material-ui/core/Container'

const Main = inject('MainStore')(props => {
  return (
    <>
      <Container
        component='main'
        maxWidth={false}
        style={{
          minHeight: '90vh',
        }}
      >
        {props.MainStore.pageList.map(page => (
          <Route
            key={page.id}
            exact
            path={page.path}
            render={() => page.component}
          />
        ))}
      </Container>
    </>
  )
})

export default Main
