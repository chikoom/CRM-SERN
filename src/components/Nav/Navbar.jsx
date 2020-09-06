import React from 'react'
import { inject } from 'mobx-react'
import { ScrollableTabs } from './Tabs'

const Navbar = inject('MainStore')(props => {
  return (
    <div className='navbar'>
      <ScrollableTabs />
    </div>
  )
})

export default Navbar
