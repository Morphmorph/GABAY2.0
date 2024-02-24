import React from 'react'
import { View, StyleSheet, Text as Ext  } from 'react-native'
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { Circle, Text } from 'react-native-svg'

// The data sets for the line chart
const data1 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const data2 = [24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89]

// The decorator component for the line chart
const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={index}
      cx={x(index)}
      cy={y(value)}
      r={4}
      stroke={value > 0 ? 'green' : 'red'}
      fill={'white'}
    />
  ))
}

// The label component for the x-axis
const Label = ({ x, y, bandwidth, data }) => {
  return data.map((value, index) => (
    <Text
      key={index}
      x={x(index) + bandwidth / 2}
      y={y(100)}
      fontSize={10}
      fill={'black'}
      alignmentBaseline={'middle'}
      textAnchor={'middle'}
    >
      {value}
    </Text>
  ))
}

// The main component for the chart
const Chart = () => {
  // The months for the x-axis
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    <View style={{ height: 271, width: 'auto', flexDirection: 'column' }}>
      <View style={{ height: 231, flexDirection: 'row' }}>
        
        <YAxis
          data={data1.concat(data2)}
          contentInset={{ top: 20, bottom: 32, left: 0, right: 0 }}
          style={{ justifyContent: 'flex-start', width: 20, left: 0 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data1}
            svg={{ stroke: 'blue' }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
          >
            <Grid />
            <Decorator />
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            data={data2}
            svg={{ stroke: 'orange' }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
          >
            <Decorator />
          </LineChart>
          <XAxis
            style={{ top: 10, marginHorizontal: -10, height: 20 }}
            data={months}
            formatLabel={(value, index) => months[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <View style={{ width: 10, height: 10, backgroundColor: 'blue', marginRight: 5 }} />
          <Ext style={{ color: '#144714'}}>Actual value</Ext>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 10, height: 10, backgroundColor: 'orange', marginRight: 5 }} />
          <Ext style={{ color: '#144714' }}>Predicted value</Ext>
        </View>
      </View>
    </View>
  )
}
export default Chart