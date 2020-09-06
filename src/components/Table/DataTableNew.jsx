import React from 'react'
import MUIDataTable from 'mui-datatables'
import { inject, observer } from 'mobx-react'
import { useState } from 'react'
import CustomToolbar from './CustomToolbar'
import { FormControlLabel, TextField, Tooltip } from '@material-ui/core'
import { Done, Clear, Edit, SaveAlt, Cancel } from '@material-ui/icons'
import TransitionsModal from '../Modal/Modal'

const DataTable = inject(
  'ClientsStore',
  'TableStore'
)(
  observer(props => {
    console.log('PPPPP', props)
    const [isInEditingMode, setIsInEditingMode] = useState(false)
    const [editedRows, setEditedRows] = useState(new Set())
    const total = props.ClientsStore.numberOfClients
    const dataList = props.ClientsStore.clientList
    const TableStore = props.TableStore
    const returnEditableTextField = (value, tableMeta, updateValue) => {
      return (
        <>
          <div
            style={{
              display: TableStore.isEdited(tableMeta.rowIndex)
                ? 'none'
                : 'block',
            }}
          >
            {value}
          </div>
          <FormControlLabel
            value={value}
            control={<TextField value={value} />}
            onChange={event => updateValue(event.target.value)}
            style={{
              display: TableStore.isEdited(tableMeta.rowIndex)
                ? 'block'
                : 'none',
            }}
          />
        </>
      )
    }
    const columns = [
      {
        name: 'id',
        label: 'ID',
        options: {
          display: 'excluded',
          filter: false,
        },
      },

      {
        name: 'firstName',
        label: 'First Name',
        options: {
          filter: false,
          sort: true,
          customBodyRender: returnEditableTextField,
        },
      },

      {
        name: 'lastName',
        label: 'Last Name',
        options: {
          filter: false,
          sort: true,
          customBodyRender: returnEditableTextField,
        },
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
          sort: false,
          customBodyRender: returnEditableTextField,
        },
      },
      {
        name: 'phone',
        label: 'Phone',
        options: {
          filter: false,
          sort: false,
          customBodyRender: returnEditableTextField,
        },
      },
      {
        name: 'country',
        label: 'Country',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'level',
        label: 'Level',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: 'sold',
        label: 'Sold',
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value === 1)
              return (
                <Tooltip title='SOLD'>
                  <Done color='primary' />
                </Tooltip>
              )
            else
              return (
                <Tooltip title='NOT SOLD'>
                  <Clear color='primary' />
                </Tooltip>
              )
          },
        },
      },
      {
        name: 'saleDate',
        label: 'Sale Date',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'firstContact',
        label: 'First Contact',
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'worker',
        label: 'Worker',
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: 'edit',
        label: 'Edit',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              (TableStore.isEdited(tableMeta.rowIndex) && (
                <>
                  <Tooltip title='SAVE'>
                    <SaveAlt
                      onClick={() => {
                        handleEditClick(value, tableMeta)
                      }}
                      color='primary'
                    />
                  </Tooltip>
                  <Tooltip title='CANCEL'>
                    <Cancel
                      onClick={() => {
                        handleCancelClick(value, tableMeta)
                      }}
                      color='primary'
                    />
                  </Tooltip>
                </>
              )) || (
                <Tooltip title='EDIT'>
                  <Edit
                    onClick={() => {
                      handleEditClick(value, tableMeta)
                    }}
                    color='primary'
                  />
                </Tooltip>
              )
            )
          },
        },
      },
    ]
    const data = dataList.map(client => [
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
      client.workerName,
      client.id,
    ])
    const handleCancelClick = (clientId, tableMeta) => {
      TableStore.cancelEditRow(tableMeta.rowIndex)
      setEditedRows(new Set(TableStore.editedRows))

      // setEditedRows(currentEditedRows)
      // console.log(editedRows)
    }
    const handleEditClick = (clientId, tableMeta) => {
      console.log('edit')
      console.log(clientId, tableMeta)
      // const currentEditedRows = editedRows
      // currentEditedRows.push(tableMeta.rowIndex)
      TableStore.editRow(tableMeta.rowIndex)
      setEditedRows(new Set(TableStore.editedRows))

      // setEditedRows(currentEditedRows)
      // console.log(editedRows)
    }
    const handleRowDelete = (rowsDeleted, data) => {
      const IDsToDelete = rowsDeleted.data.map(
        data => dataList[data.dataIndex].id
      )
      // console.log('rowsDeleted', IDsToDelete)
      props.ClientsStore.deleteClientsFromDB(IDsToDelete)
      return true
    }
    const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
      const dataListIDs = allRowsSelected.map(
        rowData => dataList[rowData.dataIndex].id
      )
      // console.log(dataListIDs)
    }

    const handleAddRowClick = () => {
      console.log('clicked on icon!')
      TableStore.addNewRow()
    }

    const options = {
      filterType: 'checkbox',
      jumpToPage: true,
      onRowsDelete: handleRowDelete,
      onRowSelectionChange: handleRowSelection,
      customToolbar: () => {
        return <CustomToolbar handleClick={handleAddRowClick} />
      },
    }
    return (
      <>
        <MUIDataTable
          title={'Clients List'}
          data={data}
          columns={columns}
          options={options}
        />
        <TransitionsModal
          open={TableStore.addRow}
          close={TableStore.closeAddNewRow}
        />
      </>
    )
  })
)

export default DataTable
