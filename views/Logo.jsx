import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Style from './Style'
import Img from '../assets/logo/logo1.png'
import UserContext from '../api_server/context'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Logo = ({navigation}) => {
const {context} = useContext(UserContext)

useEffect(() => {
  const checkNavigation = async () => {
    const board = await AsyncStorage.getItem("onboarded");
    const id = await AsyncStorage.getItem("user")

    const user = JSON.parse(id)
    // console.log(log)

  

      if (user.id) {
        navigation.navigate("Homescreen");
      } else if (!board) {
        navigation.navigate("Onboarding");
      } else if(board && !user.id) {
       await navigation.navigate("Log in");
      }

 
  };
  
  checkNavigation();
}, [context.id])
  return (
    <View style={{ flex: 1,
      justifyContent: 'center',
      alignItems: 'center',backgroundColor: '#3A6B35',}}>
      <View style={{ justifyContent: 'center',
    alignItems: 'center',}}>
      <Image source={Img} style={{ width: 100, height: 100 }} resizeMode= "contain"/>
      </View>
    </View>
  )
}

export default Logo