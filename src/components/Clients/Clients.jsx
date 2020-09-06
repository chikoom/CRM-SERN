import React from 'react'
// import DataTable from '../Table/DataTable'
import DataTable from '../Table/DataTableNew'
import { inject, observer } from 'mobx-react'

const Clients = inject('ClientsStore')(
  observer(props => {
    return (
      <div className='page-clients'>
        <div className='clients-table'>
          <DataTable
            data={{
              list: props.ClientsStore.clientList,
              total: props.ClientsStore.numberOfClients,
            }}
          />
        </div>
      </div>
    )
  })
)

export default Clients
