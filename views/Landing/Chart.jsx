import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text as Ext ,ScrollView,TouchableOpacity } from 'react-native'
import { LineChart, XAxis, YAxis,Grid } from 'react-native-svg-charts'
import { Circle, Text, Defs, LinearGradient, Stop } from 'react-native-svg'
import * as scale from 'd3-scale'
import AsyncStorage from '@react-native-async-storage/async-storage'
// The data sets for the line chart

// The decorator component for the line chart


const Decorator = ({ x, y, data, color,date,label }) => {
  const [circleRadius, setCircleRadius] = useState(new Array(data.length).fill(5));

  return data.map((value, index) => (
    <React.Fragment key={index}>
    
     
      <Circle
        cx={x(index)}
        cy={y(value)}
        r={circleRadius[index]}
        stroke={color}
        fill={'white' }   
        onPress={()=>{console.log(date[index]," ",data[index] , ' ',label.key,' ',label.icon)}}
      onPressIn={() => {
        // Change the circle radius here
        // For example, you can set the radius to a different value like 10
        const update =  [...circleRadius]
        update[index] = 10
        setCircleRadius(update);
      }}
      onPressOut={() => {
          // Change the circle radius here
          // For example, you can set the radius to a different value like 10
          const update =  [...circleRadius]
          update[index] = 5
          setCircleRadius(update);
        }}
        // onLongPress={}
         />
      <Text
          x={x(index) - 10} // Adjust the x position as needed
          y={y(value) - 10} // Adjust the y position as needed
          fontSize={8} // Adjust the font size as needed
          fill="black" // Adjust the text color as needed
          numberOfLines={1} // Limit to 1 line
          ellipsizeMode="tail"
          
          
          
        >
          { value > 0 ? value.toFixed(2) : ''} {/* Display value with 2 decimal places */}
        </Text>
      
    </React.Fragment>
  ));
};


// The label component for the x-axis

// The main component for the chart
function Chart({dataOne,dataTwo,fordate,fordata}){
//const data1 = [40, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24]
//const dataTwo = [0]



if(dataTwo.act == '' && dataTwo.det == ''){
  dataTwo.act = [0]
  dataTwo.det = [0]
}
  // Enable the Apply button if both year and month are selected
 
  
 
  

const nul = [0]
const maxDataValue = Math.max(
    Math.max(...fordata),
    Math.max(...dataTwo.act)
  );

  // Get the minimum value from both datasets
  const minDataValue = Math.min(
    Math.min(...fordata),
    Math.min(...dataTwo.act)
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
          data={fordata.concat(dataTwo.act)}
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
        <View style={{ flex:1,
        marginLeft: 10,width: fordata.length <= 4 ? 250 : 60 * fordata.length}}>
        
          <LineChart
            style={[StyleSheet.absoluteFill,{}]} 
            data={ dataTwo.act}
            svg={{ stroke: 'blue',
            strokeWidth: 3,
            strokeLinejoin:'round',
            strokeLinecap:'butt',
            strokeDasharray: [10, 5] }}
            contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            xAccessor={({index})=>index}
             yAccessor={({ item }) => item}
             xMin={0}
             xMax={fordata.length - 1}
             yMin={yMin}
             yMax={yMax}
             xScale={scale.scaleLinear}
          >
         
             <Decorator color = "blue" data = {dataTwo.det}/>
          </LineChart>
          

          <LineChart
            style={{height:"100%",width:"100%"}}
            data={fordata}
            svg={{ stroke: 'orange' ,
            strokeWidth: 3,
            strokeLinejoin:'round',
            strokeLinecap:'butt',
            strokeDasharray: [10, 5] 
          }}
            contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            xAccessor={({ index }) => index}
            yAccessor={({ item }) => item}
            gridMax = {yMax}
            xMin={0}
            xMax={fordata.length - 1}
            yMin={yMin}
            yMax={yMax}
            xScale={scale.scaleLinear}
          >
          <Grid/>
         
           <Decorator color = "orange" date = {fordate} label = {dataOne}/>
          </LineChart>
         
       

       
          <XAxis
            style={{ top: -15, marginHorizontal: -10, height: 20 }}
            data={fordate}
            formatLabel={(value, index) => new Date(fordate[index]).toLocaleString('default', { month: 'short',year:'numeric' })}
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