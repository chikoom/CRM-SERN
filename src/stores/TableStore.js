import { observable, action, computed } from 'mobx'
import axios from 'axios'

export class TableStore {
  @observable editedRows
  @observable addRow
  @observable modalOpen

  constructor() {
    this.editedRows = new Set()
    this.addRow = false
    this.modalOpen = false
  }
  @action editRow = rowIndex => {
    this.editedRows.add(rowIndex)
  }
  @action cancelEditRow = rowIndex => {
    this.editedRows.delete(rowIndex)
  }
  @action saveRow = rowIndex => {
    this.editedRows.delete(rowIndex)
  }
  @action openModal = () => {
    this.modalOpen = true
  }
  @action closeModal = () => {
    this.modalOpen = false
  }
  isEdited = rowIndex => {
    return this.editedRows.has(rowIndex)
  }
  @action addNewRow = () => {
    this.addRow = true
  }
  @action closeAddNewRow = () => {
    this.addRow = false
  }
  @action saveNewRow = () => {
    this.addRow = false
  }

  @computed get numberOfClients() {
    return ''
  }
}
