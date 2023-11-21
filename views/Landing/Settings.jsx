import { View, Text } from 'react-native'
import React from 'react'
import Style from '../Style'

const Settings = () => {
  return (
    <View style={Style.common}>
     <View style={Style.footer}>
        <Text style={Style.footerText}>Version 1.0.0</Text>
        <Text style={Style.footerText}>© 2023 GABAY</Text>
        <Text style={Style.footerText}>Terms of Service | Privacy Policy</Text>
        <Text style={Style.footerText}>Contact us: gabaysupport@gmail.com</Text>
      </View>
    </View>
  )
}

export default Settings