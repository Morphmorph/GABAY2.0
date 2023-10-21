import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Style from '../Style';
import icon1 from '../../assets/Icon/necessities/n1.png';

const InspectExpenses = () => {
  return (
    <View style={Style.common}>
      <ScrollView>
        <View style={{ margin: 5, padding: 10, backgroundColor: '#CBD18F', borderRadius: 5 }}>
          <Text style={{ color: '#144714', fontSize: 17, top: -5, alignSelf: 'center' }}>January 2023</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ backgroundColor: '#144714', borderRadius: 10, flexDirection: 'row', flex: 1 }}>
              <Image source={icon1} style={{ width: 80, height: 80, margin: 10, backgroundColor: '#3A6B35', borderRadius: 10 }} />
              <View style={{ flexDirection: 'column', alignSelf: 'center', marginRight: 10, borderLeftWidth: 2, borderColor: '#E3B448', backgroundColor: '#3A6B35', borderBottomRightRadius: 5, borderTopRightRadius: 5, flex: 1 }}>
                <View style={{ paddingVertical: 10 }}>
                  <Text style={{ color: '#E3B448', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> School </Text>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: '#E3B448', paddingVertical: 10 }}>
                  <Text style={{ color: '#E3B448', marginLeft: 5, fontWeight: 'bold', width: 'auto' }}> <Iconn name="currency-php" style={{ fontSize: 15 }} /> 1,000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InspectExpenses;