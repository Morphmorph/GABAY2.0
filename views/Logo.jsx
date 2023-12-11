import { View, Text, Image } from 'react-native'
import React from 'react'
import Style from './Style'
import Img from '../assets/logo/logo1.png'


const Logo = () => {
  return (
    <View style={Style.common}>
      <View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
      <Image source={Img} style={{ width: 100, height: 100 }}/>
      </View>
    </View>
  )
}

export default Logo