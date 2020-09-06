import { observable } from 'mobx'

class Client {
  @observable firstName
  @observable lastName
  @observable email
  @observable phone
  @observable country
  @observable level
  @observable sold
  @observable saleDate
  @observable firstContact
  @observable workerName

  constructor(
    id,
    firstName,
    lastName,
    email,
    phone,
    country,
    level,
    sold,
    saleDate,
    firstContact,
    workerName
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.country = country
    this.level = level
    this.sold = sold
    this.saleDate = saleDate
    this.firstContact = firstContact
    this.workerName = workerName
  }
}

export default Client
