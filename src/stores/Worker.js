import { observable } from 'mobx'

class Worker {
  @observable firstName
  @observable lastName
  @observable email
  @observable phone
  @observable imageURL
  constructor(id, firstName, lastName, email, phone, imageURL) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.imageURL = imageURL
  }
}

export default Worker
