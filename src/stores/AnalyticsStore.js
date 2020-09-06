import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { HOST } from '../utils/constants'

export class AnalyticsStore {
  @observable salesBy
  @observable topEmployee
  @observable salesSince

  constructor() {
    this.salesBy = []
    this.topEmployee = []
    this.salesSince = [
      {
        saleDate: '',
        total: 0,
      },
    ]
    this.standingClient = 0
    this.newSales = 0
    this.newCustomers = 0
    this.hotestCountry = 0
  }
  @action init = async () => {
    const newCustomers = await this.getTypeOfClientsByDate(
      '2020-07-30',
      '2020-08-30',
      'firstContact'
    )

    console.log('newCustomers', newCustomers)
    this.newSales = await this.getTypeOfClientsByDate(
      '2020-07-30',
      '2020-08-30',
      'saleDate'
    )
    console.log('newSales', this.newSales)
    const salesByCountry = await this.getSalesBy('countries')
    console.log('salesByCountry', salesByCountry)
    // this.hotestCountry = salesByCountry.
    const standingClients = await this.getTypeOfClientsByDate(
      '2020-07-30',
      '2020-08-30',
      'saleDate'
    )
    console.log('standingClients', standingClients)
  }
  @action getClientsByLevel = async () => {
    const results = await axios.get(`${HOST}/api/stats/clients/sum/levels`)

    return results
  }
  @action getTypeOfClientsByDate = async (from, until, field) => {
    const results = await axios.get(`${HOST}/api/stats/daterange/sum/`, {
      params: {
        from: from,
        until: until,
        field: field,
      },
    })
    return results.data.total
  }
  @action getSalesBy = async field => {
    const results = await axios.get(`${HOST}/api/stats/sales/sum/${field}`)
    this.salesBy = results.data
    console.log('results', results)
    return results.data
  }
  @action getTopEmployee = async () => {
    const results = await axios.get(`${HOST}/api/stats/sales/sum/workers`)
    this.topEmployee = results.data
    console.log('TOP', results)
  }
  @action getSalesSince = async () => {
    const results = await axios.get(`${HOST}/api/stats/daterange/sum/`, {
      params: {
        from: '2020-07-30',
        until: '2020-08-30',
        field: 'saleDate',
      },
    })
    this.salesSince = results.data
    console.log('SALES SINCE', results)
  }
  @computed get numberOfClients() {
    return this.totalNumberOfClients
  }
  get clientList() {
    return this.clientList[['Target']][['Target']]
  }
}
