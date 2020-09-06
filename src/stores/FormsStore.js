import { observable, action, computed } from 'mobx'
import { HOST } from '../utils/constants'
import axios from 'axios'
require('dotenv').config()

// const { HOST } = process.env ? process.env : ''

export class FormsStore {
  @observable firstName
  @observable lastName
  @observable email
  @observable phone
  @observable selectedCountry
  @observable level
  @observable sold
  @observable saleDate
  @observable firstContact
  @observable workerFirstName
  @observable workerLastName
  @observable countries
  @observable enteredFirstName
  @observable enteredLastName
  @observable enteredEmail
  @observable enteredPhone

  constructor() {
    this.editedRows = new Set()
    this.addRow = false
    this.modalOpen = false
    this.countries = []
    this.clientLevels = []
    this.selectedCountry = ''
    this.selectedWorker = ''
    this.enteredFirstName = ''
    this.enteredLastName = ''
    this.enteredEmail = ''
    this.enteredPhone = ''
  }
  @action init = async () => {
    const allCountries = await this.getCountriesFromDB()
    this.countries = allCountries
    const allLevels = await this.getLevelsFromDB()
    this.clientLevels = allLevels
    // console.log('ALL LEVELS', this.clientLevels)
  }
  @action editRow = rowIndex => {
    this.editedRows.add(rowIndex)
  }
  @action getCountriesFromDB = async () => {
    const results = await axios.get(`${HOST}/api/data/countries`)
    return results.data
  }
  @action getLevelsFromDB = async () => {
    const results = await axios.get(`${HOST}/api/data/levels`)
    return results.data
  }
  @action updateField = (fieldName, value) => {
    this[fieldName] = value
    // console.log('UPDATED', fieldName, this[fieldName])
  }
}
