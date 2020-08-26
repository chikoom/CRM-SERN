import { observable } from 'mobx'

export class Client {
  @observable firstName
  @observable lastName
  @observable country
  @observable email
  @observable phone
  @observable worker
  @observable sold

  constructor(
    id,
    firstName,
    lastName,
    country = '',
    email = '',
    phone = '',
    worker = null
  ) {
    this._id = id
    this.firstName = firstName
    this.lastName = lastName
    this.country = country
    this.email = email
    this.phone = phone
    this.worker = worker
    this.sold = false
  }
}
