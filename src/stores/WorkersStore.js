import { observable, action, computed } from 'mobx'
import Worker from './Worker'
import axios from 'axios'
import { HOST } from '../utils/constants'

export class WorkersStore {
  @observable workersList
  @observable totalNumberOfWorkers

  constructor() {
    this.workersList = []
    this.totalNumberOfWorkers = 0
  }
  @action getAllWorkersFromDB = async () => {
    const allWorkers = await axios.get(`${HOST}/api/workers/`)
    // console.log('allWorkers', allWorkers)
    const allWorkersObjects = allWorkers.data.workers.map(
      client =>
        new Worker(
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
    this.workersList = allWorkersObjects
  }
  @action deleteWorkerFromDB = async clientIDarray => {
    // for (const clientID of clientIDarray) {
    //   await axios.delete(`http://localhost:3210/api/clients/${clientID}`)
    // }
    // await this.getAllClientsFromDB()
  }
  @computed get numberOfWorkers() {
    return this.workersList.length
  }
  get clientList() {
    return this.clientList[['Target']][['Target']]
  }
}
