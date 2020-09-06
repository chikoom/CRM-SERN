import React from 'react'
import Navbar from './components/Nav/Navbar'
import Main from './components/Main'
import Footer from './components/Footer/Footer'
import { observer } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

const App = observer(props => {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className='App'>
          <Navbar />
          <Main />
          <Footer />
        </div>
      </Router>
    </>
  )
})

export default App
