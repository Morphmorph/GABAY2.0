// VerifyView.js

import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useVerifyController } from '../../controller/VerifyController'; // Import the controller
import Loader from './actionLoader';



const Verify = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { email, setEmail, emailError, setEmailError, handleVerify, reSend,loader,setLoader } = useVerifyController();
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  
  return (
    <View style={Style.common} pointerEvents ={loader ?  'none' : 'auto'}>
        <Loader visible ={loader} message = "Sending..."/>
      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        <Text style={Style.textcolor}>SEND VERIFICATION</Text>

        <CustomInput
          iconName="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={emailError}
          onFocus={() => {
            // Clear email error on focus
            setEmailError(null);
          }}
        />

        <TouchableOpacity style={Style.signInButton} onPress={handleVerify}>
          <Text style={Style.signInButtonText}>Send</Text>
        </TouchableOpacity>

        {/* <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginVertical: 20,
            color: '#144714',
          }}
        >
          Doesn't receive verification?{' '}
          <Text onPress={reSend} style={{ color: '#E3B448' }}>
            Resend
          </Text>
        </Text> */}
      </View>
      <View style={Style.footer}>
        <Text style={Style.footerText}>© 2023 GABAY. All Rights Reserved.</Text>
        <View style={Style.footerLinks}>
          <TouchableOpacity onPress={handleTOS}>
            <Text style={Style.footerLinkText}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={Style.footerText}> | </Text>
          <TouchableOpacity onPress={handlePP}>
            <Text style={Style.footerLinkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Verify;
