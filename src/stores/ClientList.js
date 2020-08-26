import { observable, action, computed } from 'mobx'
import Client from './Client'

export class ClientList {
  @observable clientList

  constructor() {
    this.clientList = []
  }
  @action getClientListFromDB() {}
  @computed get numberOfClients() {
    return this.clientList.length
  }
}
