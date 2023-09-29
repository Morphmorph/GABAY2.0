import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { usePinController } from '../../controller/PinController'; // Import the controller

const Pin = () => {
  const { height } = useWindowDimensions();
  const { pin, setPin, pinError, setPinError, handleVerify, reSend } = usePinController();

  return (
    <View style={Style.common}>
      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        <Text style={Style.textcolor}>VERIFY ACCOUNT</Text>

        <CustomInput
          iconName="pin"
          placeholder="PIN here"
          value={pin}
          onChangeText={(text) => setPin(text)}
          error={pinError}
          keyboardType='numeric'
          onFocus={() => {
            // Clear error on focus
            setPinError(null);
          }}
        />

        <TouchableOpacity style={Style.signInButton} onPress={handleVerify}>
          <Text style={Style.signInButtonText}>Verify</Text>
        </TouchableOpacity>

        <Text
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
        </Text>
      </View>
    </View>
  );
};

export default Pin;
