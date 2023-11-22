import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Style from '../Style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = ({navigation}) => {
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  const handleHelp = () => {
    navigation.navigate('Help');
  };
  const handleAbout = () => {
    navigation.navigate('About');
  };
  const handleCP = () => {
    navigation.navigate('Change password');
  };
  return (
    <View style={Style.common}>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Account</Text>
        <Text style={{marginTop: 5, fontSize: 15, color: '#E3B448'}}>Update your password to keep your account secure</Text>
        </View>
        <TouchableOpacity>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='key-variant' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Change Password</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Community Standards and Policies</Text>
        </View>
        <TouchableOpacity onPress={handleTOS}>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='book-open-page-variant-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Terms and services</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePP}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='database-arrow-left-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Privacy and policy</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{borderBottomWidth: 1, borderColor: '#144714', marginHorizontal: 10}}>
        <View>
        <Text style={{marginTop: 5, fontSize: 25, color: '#CBD18f'}}>Help and Support</Text>
        </View>
        <TouchableOpacity onPress={handleHelp}>
        <View style={{backgroundColor: '#A2A869', padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='help-circle-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Help</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAbout}>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='book-open-page-variant' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> About</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='lifebuoy' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Support inbox</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{backgroundColor: '#A2A869', top: -10, marginBottom: -1, padding: 10, margin: 10, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='message-alert-outline' style={{ fontSize: 20, color: '#144714' }} />
        <Text style={{color: '#144714', fontSize: 15}}> Report a problem</Text>
        </View>
        </TouchableOpacity>
      </View>
    <View style={Style.footer}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Icon name='email' style={{ fontSize: 15, color: '#144714' }} />
        <Text style={Style.footerText}> gabaysupport@gmail.com</Text>
        </View>
        <Text style={Style.footerText}>© 2023 GABAY. All Rights Reserved.</Text>
      </View>
    </View>
  )
}

export default Settings