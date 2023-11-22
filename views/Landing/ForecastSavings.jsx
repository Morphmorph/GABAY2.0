import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Style from '../Style'
import CustomInput from '../CustomInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import DonutChart from './DonutChart'
import { axiosRequest } from '../../api_server/axios';
import UserContext from '../../api_server/context';

const ForecastSavings = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  
  const [income, setIncome] = useState('')
  const [incomeError, setIncomeError] = useState(null)
  const [selectedOption, setSelectedOption] = useState('Year');
  const [forecast,setForcast] = useState([])
  const {context,totalincome} = useContext(UserContext)
  const [value,setValue] = useState()

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
    {
      key: 'April',
      value: 9000, 
    },
    {
      key: 'May',
      value: 1500, 
    },
    
  ];
  const toggleOption = () => {
    setSelectedOption(selectedOption === 'Year' ? 'Month' : 'Year');
  };

  const Forecast = async() =>{
      axiosRequest.get(`gabay/transaction-data/${context.id}/?no_months_to_predict=${income}&income=${totalincome}&period=${selectedOption}`)
      .then((response)=>{
        data = response.data.avarage
        setForcast(data)
        setValue(response.data.forecast)
        console.log(response.data.forecast)
      })
  }

  

 
  return (
    <View style={Style.common}>
      <View style={{marginBottom: 20,}}>
        <View
          style={{
            top: 10,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingHorizontal: 20,
            borderRadius: 5,
            width: '80%'
          }}
        >
          <CustomInput
            iconName="calendar"
            placeholder={selectedOption}
            keyboardType="numeric"
            value={income}
            onChangeText={handleIncomeChange}
            error={incomeError}
            onFocus={() => {
              setIncomeError(null)
            }}
          />
          <View style={{top: -10, flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignItems: 'center',}}>
          <Text style={{ textAlign: 'center', color: '#E3B448', width:"100%",}}>{selectedOption}</Text>
          </View>
          <View>
          <TouchableOpacity onPress={toggleOption}>
          <Icon name="swap-vertical-circle-outline" style={{ fontSize: 20, color: '#E3B448', right: 5,}} />
          </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#A2A869',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', 
            }}
            onPress={Forecast}
          >
            <Text style={{ color: '#144714', fontSize: 18,}}>Forecast</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={{ top: 0, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center', padding: 5, }}>
      <Text style={{ color: '#E3B448', fontSize: 21, }}>Predicted Savings</Text>
      </View>
      <View style={{backgroundColor: '#CBD18F', paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10,}}>
              
              <View style={{padding: 18.8, marginBottom: 20,}}>
              <DonutChart data={forecast} predict = {value}/>

              </View>
              
              <TouchableOpacity style={{bottom: 10, backgroundColor: '#A2A869', paddingVertical: 10,  width: '100%', paddingHorizontal: 30, borderRadius: 5, alignSelf: 'center', alignItems: 'center'}} onPress={() => {navigation.navigate('History',{details:forecast})}}>
                <Text style={{color: '#144714', fontSize: 18, }}>View details</Text>
              </TouchableOpacity>
            
              </View>

    </View>
  )
}

export default ForecastSavings