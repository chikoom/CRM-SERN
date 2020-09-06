import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const TopEmployee = inject('AnalyticsStore')(
  observer(props => {
    const createTableData = data => {
      // console.log('DDDDDD', data)
      return data.map(row => ({
        name: row.firstName,
        sales: row.total,
      }))
    }
    useEffect(() => {
      const getData = async () => {
        props.AnalyticsStore.getTopEmployee()
      }
      getData()
    }, [])

    const { AnalyticsStore } = props
    const salesData = AnalyticsStore.topEmployee
    const data = createTableData(salesData)
    // console.log(salesData)
    return (
      <ResponsiveBar
        data={data}
        keys={['sales']}
        indexBy='name'
        layout='horizontal'
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        minValue={0}
        colors={{ scheme: 'nivo' }}
        colorBy='index'
        borderColor={{ from: 'color', modifiers: [['darker', '1.4']] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'sales',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
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

export default TopEmployee
