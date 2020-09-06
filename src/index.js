import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { MainStore as mainStore } from './stores/MainStore'
import { ClientsStore as clientsStore } from './stores/ClientsStore'
import { WorkersStore as workersStore } from './stores/WorkersStore'
import { TableStore as tableStore } from './stores/TableStore'
import { AnalyticsStore as analyticsStore } from './stores/AnalyticsStore'
import { FormsStore as formsStore } from './stores/FormsStore'
import 'fontsource-roboto'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const MainStore = new mainStore()
const ClientsStore = new clientsStore()
ClientsStore.getAllClientsFromDB()
const WorkersStore = new workersStore()
WorkersStore.getAllWorkersFromDB()
const AnalyticsStore = new analyticsStore()
AnalyticsStore.init()
const TableStore = new tableStore()
const FormsStore = new formsStore()
FormsStore.init()

const stores = {
  MainStore,
  ClientsStore,
  WorkersStore,
  AnalyticsStore,
  TableStore,
  FormsStore,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
