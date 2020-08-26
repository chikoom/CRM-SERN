import { observable } from 'mobx'

export class Worker {
  @observable firstName
  @observable lastName
  @observable email
  @observable phone
  @observable clients

  constructor(id, firstName, lastName, email = '', phone = '') {
    this._id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.clients = []
  }
}
