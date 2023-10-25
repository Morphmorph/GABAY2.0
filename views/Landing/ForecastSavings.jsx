import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation } from '@react-navigation/native'
import DonutChart from './DonutChart'

const ForecastSavings = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  
  const [income, setIncome] = useState('')
  const [incomeError, setIncomeError] = useState(null)
  
  const handleIncomeChange = (text) => {
    // Clear existing errors
    setIncomeError(null)

    // Remove non-digit characters
    const numericValue = text.replace(/[^0-9]/g, '')

    // Format the numeric value with commas
    const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    setIncome(formattedIncome)
  }

  
  const history = [
    {
      key: 'January',
      value: 2000, 
    },
    {
      key: 'February',
      value: 5000, 
    },
    {
      key: 'March',
      value: 2500, 
    },
    
  ];

 
  return (
    <View style={Style.common}>
      <View>
        <View
          style={{
            top: 20,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingBottom: -70,
            paddingHorizontal: 20,
            marginHorizontal: 40,
            borderRadius: 5,
          }}
        >
          <CustomInput
            iconName="calendar"
            placeholder="Year"
            keyboardType="numeric"
            value={income}
            onChangeText={handleIncomeChange}
            error={incomeError}
            onFocus={() => {
              // Clear income error on focus
              setIncomeError(null)
            }}
          />
          <Text style={{ top: -10, textAlign: 'center', color: '#E3B448' }}>Year</Text>
        </View>
      </View>
      <View style={{ top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center',}}>
        <Text style={{ color: '#E3B448', paddingVertical: 5 }}>Forecast Savings</Text>
      </View>
      <View style={{ top: 30, backgroundColor: 'white',  width: 'auto', alignContent: 'center', borderRadius: 10, margin: 10}}>
              
              <View style={{padding: 10, width: 'auto',}}>
              <DonutChart data={history}/>

              </View>
              
              <TouchableOpacity style={{bottom: 10, backgroundColor: '#CBD18F', paddingVertical: 10,  width: 'auto', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center'}} onPress={() => {navigation.navigate('History')}}>
                <Text style={{color: '#144714', fontSize: 18, }}>View details</Text>
              </TouchableOpacity>
            
              </View>
      

      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CBD18F',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={{}}
          >
            <Text style={{ color: '#144714', fontSize: 18,}}>Forecast</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  )
}

export default ForecastSavings
