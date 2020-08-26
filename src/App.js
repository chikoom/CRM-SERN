import React from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { Component } from 'react'

@observer
class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    )
  }
}

export default App
