import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Style from '../Style'
import icon1 from '../../assets/Icon/income/i1.png'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const InspectIncome = () => {
  return (
    <View style={Style.common}>
      <ScrollView>
        <View style={{margin: 5, padding: 10, backgroundColor: '#CBD18F', borderRadius: 5}}>
          
        <View style={{ backgroundColor: '#144714', borderRadius: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Image source={icon1} style={{width: 80, height: 80, margin: 10, backgroundColor: '#3A6B35', borderRadius: 10,}} />
        <View style={{flexDirection: 'column', paddingVertical: 10, borderLeftWidth: 2, borderColor: '#E3B448', backgroundColor: '#3A6B35', width: 220, borderBottomRightRadius: 5, borderTopRightRadius: 5}}>
        <Text style={{color: '#E3B448', marginBottom: 5, marginLeft: 5, fontWeight: 'bold'}}> Business </Text>
        <View style={{borderTopWidth: 1, borderColor: '#E3B448', }}>
        <Text style={{color: '#E3B448', marginTop: 5, marginLeft: 5, fontWeight: 'bold'}}> <Icon name="currency-php" style={{fontSize: 15,}}/> 10,000</Text>
        </View>
        </View>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default InspectIncome