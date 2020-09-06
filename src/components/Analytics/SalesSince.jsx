import { ResponsiveLine } from '@nivo/line'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { useEffect } from 'react'
let ids = 1
const SalesSince = inject('AnalyticsStore')(
  observer(props => {
    const createTableData = data => {
      // console.log('SSSSSS', data)
      return [
        {
          id: 'japan',
          data: data.map(row => ({
            x: row.saleDate,
            y: row.total,
          })),
        },
      ]
    }
    useEffect(() => {
      const getData = async () => {
        props.AnalyticsStore.getSalesSince()
      }
      getData()
    }, [])
    const { AnalyticsStore } = props
    const salesData = AnalyticsStore.salesSince
    const data = createTableData(salesData)
    // console.log('DDDDDDDDDAAAAAAAAAAAAA', data)
    return (
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        curve='linear'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={5}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel='y'
        pointLabelYOffset={-8}
        enableArea={true}
        useMesh={true}
        legends={[]}
      />
    )
  })
)

export default SalesSince

const data = [
  {
    id: 'japan',
    color: 'hsl(142, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 19,
      },
      {
        x: 'helicopter',
        y: 212,
      },
      {
        x: 'boat',
        y: 103,
      },
      {
        x: 'train',
        y: 20,
      },
      {
        x: 'subway',
        y: 277,
      },
      {
        x: 'bus',
        y: 248,
      },
      {
        x: 'car',
        y: 19,
      },
      {
        x: 'moto',
        y: 28,
      },
      {
        x: 'bicycle',
        y: 71,
      },
      {
        x: 'horse',
        y: 278,
      },
      {
        x: 'skateboard',
        y: 71,
      },
      {
        x: 'others',
        y: 283,
      },
    ],
  },
]
