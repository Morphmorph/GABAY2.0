// VerifyView.js

import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useVerifyController } from '../../controller/VerifyController'; // Import the controller
import Loader from './actionLoader';



const Verify = () => {
  const { height } = useWindowDimensions();
  const { email, setEmail, emailError, setEmailError, handleVerify, reSend,loader,setLoader } = useVerifyController();
  
  
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
    </View>
  );
};

export default Verify;
