import { observable, action, computed } from 'mobx'
import Client from './Client'
import axios from 'axios'
import { HOST } from '../utils/constants'

export class ClientsStore {
  @observable clientList
  @observable totalNumberOfClients

  constructor() {
    this.clientList = []
    this.totalNumberOfClients = 0
  }
  @action getAllClientsFromDB = async () => {
    const allClients = await axios.get(`${HOST}/api/clients/`)
    // console.log('ALLLLLL', allClients)
    const allClientsObjects = allClients.data.clients.map(
      client =>
        new Client(
          client.id,
          client.firstName,
          client.lastName,
          client.email,
          client.phone,
          client.country,
          client.level,
          client.sold,
          client.saleDate,
          client.firstContact,
          client.workerName
        )
    )
    this.clientList = allClientsObjects
  }
  @action getClientListFromDB = async () => {
    const results = await axios.get(`${HOST}/api/clients/`, {
      params: {
        page: 1,
        limit: 20,
      },
    })
    this.clientList = results.data.clients
    this.totalNumberOfClients = results.data.total
  }
  @action deleteClientsFromDB = async clientIDarray => {
    for (const clientID of clientIDarray) {
      await axios.delete(`${HOST}/api/clients/${clientID}`)
    }
    await this.getAllClientsFromDB()
  }
  @computed get numberOfClients() {
    return this.totalNumberOfClients
  }
  get clientList() {
    return this.clientList[['Target']][['Target']]
  }
}
