import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePinController } from '../../controller/PinController'; // Import the controller
import ModalMessage from '../Modal';
import Loader from './actionLoader';
import ModalMessageEE from '../ModalEE';

const Pin = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { pin, setPin, pinError, setPinError, handleVerify, reSend, showModalMessage, setShowModalMessage, loader, setLoader, showModalEEMessage, setShowModalEEMessage } = usePinController();
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  return (
    <View style={Style.common}>
      <Loader visible ={loader} message="Verifying..."/>
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
      <ModalMessage showAutomatically={showModalMessage} message="Your account is successfully verified!" icon={<MaterialCommunityIcons name="account-check" size={200} color="#E3B448" />} navigateToScreen=""/>
      <ModalMessageEE showAutomatically={showModalEEMessage} message="Check your internet connection!" icon={<MaterialCommunityIcons name="wifi-alert" size={200} color="#810000" />} navigateToScreen="Log in"/>
      
    </View>
  );
};

export default Pin;
