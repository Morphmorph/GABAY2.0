import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'


const Loader = ({visible = false,message = "Please wait..."}) => {
const {height, width} = useWindowDimensions();
  return (
    visible && ( 
    <View style={[style.container,{height: '100%', width,pointerEvents: 'none'}]}>
      <View style={style.loader}>
      <ActivityIndicator size ='large' color = '#E3B448'/>
        <Text style={{marginLeft: 15, fontSize: 20, color: '#E3B448'}}> {message}</Text>
     </View>
    </View>
    )
  )
};

const style = StyleSheet.create ({
    container: {
      position: 'absolute',
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      
    },
    loader: {
        height: 70,
        backgroundColor: '#3A6B35',
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

    }
})


export default Loader 