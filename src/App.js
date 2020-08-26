import React from 'react'
import './App.css'
import { observer } from 'mobx-react'

const App = observer(props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  )
})

export default App
