import React from 'react'
import { observable, action, computed } from 'mobx'
import About from '../components/About/About'
import Home from '../components/Home/Home'
import Analytics from '../components/Analytics/Analytics'
import Actions from '../components/Actions/Actions'
import Clients from '../components/Clients/Clients'
import Workers from '../components/Workers/Workers'

export class MainStore {
  constructor() {
    this.pageList = [
      {
        id: 1,
        path: '/',
        name: 'home',
        component: <Home />,
      },
      {
        id: 2,
        path: '/about',
        name: 'about',
        component: <About />,
      },
      {
        id: 3,
        path: '/clients',
        name: 'clients',
        component: <Clients />,
      },
      {
        id: 4,
        path: '/workers',
        name: 'workers',
        component: <Workers />,
      },
      {
        id: 5,
        path: '/actions',
        name: 'actions',
        component: <Actions />,
      },
      {
        id: 6,
        path: '/analytics',
        name: 'analytics',
        component: <Analytics />,
      },
    ]
  }
}
