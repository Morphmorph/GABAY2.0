import React from 'react'
import { View, StyleSheet, Text as Ext ,ScrollView,TouchableOpacity } from 'react-native'
import { LineChart, XAxis, YAxis,Grid } from 'react-native-svg-charts'
import { Circle, Text } from 'react-native-svg'
import * as scale from 'd3-scale'
// The data sets for the line chart

// The decorator component for the line chart


const Decorator = ({ x, y, data, color }) => {
  

  return data.map((value, index) => (
    <React.Fragment key={index}>
    
     
      <Circle
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={value > 0 ? color : 'none'}
        fill={value > 0 ? 'white' : 'none'}
         />
      <Text
          x={x(index) - 10} // Adjust the x position as needed
          y={y(value) - 10} // Adjust the y position as needed
          fontSize={8} // Adjust the font size as needed
          fill="black" // Adjust the text color as needed
        >
          { value > 0 ? value.toFixed(2) : ''} {/* Display value with 2 decimal places */}
        </Text>
      
    </React.Fragment>
  ));
};


// The label component for the x-axis

// The main component for the chart
function Chart({dataOne,dataTwo = [0]}){
//const data1 = [40, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24]
//const dataTwo = [0]
const nul = [0]
const maxDataValue = Math.max(
    Math.max(...dataOne.chart_data),
    Math.max(...dataTwo)
  );

  // Get the minimum value from both datasets
  const minDataValue = Math.min(
    Math.min(...dataOne.chart_data),
    Math.min(...dataTwo)
  );

  // Calculate padding for y-axis
  const yPadding = Math.abs(maxDataValue - minDataValue) * 0.1;

  // Set yMin and yMax with padding
  const yMin = minDataValue - yPadding;
  const yMax = maxDataValue + yPadding;


// console.log("sheet",dataOne.chart_data)
  // Thce months for the x-axis
  
  
  
  return (
    <View style={{ height: 271, width: 'auto', flexDirection: 'column' }}>
      <View style={{ height: 231, width:"100%",flexDirection: 'row' }}>
        
        <YAxis
          data={dataOne.chart_data.concat(dataTwo)}
          contentInset={{ top: 35, bottom: 35, left: 0, right: 0 }}
          style={{ justifyContent: 'flex-start', width: 70, left: 0 ,}}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value.toFixed(1)}`}
        />
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flex:1,backgroundColor:"transparent",
        marginLeft: 10,width: dataOne.chart_data.length <= 4 ? 250 : 60 * dataOne.chart_data.length}}>
        
          <LineChart
            style={{height:"100%",width:"100%"}}
            data={dataOne.chart_data}
            svg={{ stroke: 'orange' }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
            xAccessor={({ index }) => index}
            yAccessor={({ item }) => item}
            
            gridMax = {yMax}
            xMin={0}
            xMax={dataOne.chart_data.length - 1}
            yMin={yMin}
            yMax={yMax}
            xScale={scale.scaleLinear}
          >
          <Grid/>
         
           <Decorator color = "orange" data = {dataOne.chart_data}/>
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            data={ dataOne.chart_data.length > 1 ? dataTwo :dataTwo}
            svg={{ stroke: 'blue' }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
            xAccessor={({index})=>index}
             yAccessor={({ item }) => item}
             xMin={0}
             xMax={dataOne.chart_data.length - 1}
             yMin={yMin}
             yMax={yMax}
             xScale={scale.scaleLinear}
          >
         
             <Decorator color = "blue" data = {dataTwo}/>
          </LineChart>
          <XAxis
            style={{ top: -15, marginHorizontal: -10, height: 20 }}
            data={dataOne.chart_date}
            formatLabel={(value, index) => new Date(dataOne.chart_date[index]).toLocaleString('default', { month: 'short',year:'numeric' })}
            contentInset={{ left: 30, right: 30 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>
      </ScrollView>
        
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