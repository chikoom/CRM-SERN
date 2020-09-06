import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'

const SalesBy = inject('AnalyticsStore')(
  observer(props => {
    console.log(props.AnalyticsStore)
    const createTableData = data => {
      // console.log('DDDDDD', data)
      return data.map(row => ({
        country: row.name,
        sales: row.total,
      }))
    }
    useEffect(() => {
      const getData = async () => {
        props.AnalyticsStore.getSalesBy('countries')
      }
      getData()
    }, [])

    const { AnalyticsStore } = props
    const salesData = AnalyticsStore.salesBy
    const data = createTableData(salesData)
    // console.log(salesData)
    return (
      <ResponsiveBar
        data={data}
        keys={['sales']}
        indexBy='country'
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        minValue={0}
        colors={{ scheme: 'set3' }}
        colorBy='index'
        borderColor={{ from: 'color', modifiers: [['darker', '1.4']] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'sales',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    )
  })
)

export default SalesBy
