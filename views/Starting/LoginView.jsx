import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useLoginController } from '../../controller/LoginController'; // Import the controller
import Loader from './actionLoader';
import ModalMessage from '../Modal';

const Login = ({navigation}) => {
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  const { height } = useWindowDimensions();
  const { inputs, setInputs, errors, setErrors, goToSignup, goToForgot, handleSignIn, loader, SetLoader, showModalMessage, setShowModalMessage } = useLoginController();
  const bol = loader
  return (
    <View style={Style.common} pointerEvents={bol ? 'none' : 'auto'}>
      <Loader visible={loader} message="Signing in..." />
      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        <Text style={Style.textcolor}>SIGN IN</Text>

        <CustomInput
          iconName="email"
          placeholder="Email"
          value={inputs.email}
          onChangeText={(text) => setInputs({ ...inputs, email: text })}
          error={errors.email}
          onFocus={() => {
            // Clear email error on focus
            setErrors((prevErrors) => ({ ...prevErrors, email: null }));
          }}
        />

        <CustomInput
          iconName="lock"
          placeholder="Password"
          value={inputs.password}
          onChangeText={(text) => setInputs({ ...inputs, password: text })}
          secureTextEntry
          error={errors.password}
          onFocus={() => {
            // Clear password error on focus
            setErrors((prevErrors) => ({ ...prevErrors, password: null }));
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginBottom: 20,
            color: '#144714',
          }}
        >
          <Text onPress={goToForgot} style={{ color: '#E3B448' }}>
            Forgot password
          </Text>
        </Text>
        <TouchableOpacity style={Style.signInButton} onPress={handleSignIn} disabled={loader}>
          <Text style={Style.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginVertical: 20,
            color: '#144714',
          }}
        >
          Doesn't have an account?{' '}
          <Text onPress={goToSignup} style={{ color: '#E3B448' }}>
            Register
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
      <ModalMessage showAutomatically={showModalMessage} message="WELCOME TO GABAY!" icon={<Image source={require('../../assets/logo/logo1.png')} style={{ width: 200, height: 200 }} resizeMode="contain"/>} navigateToScreen="Incomes"/>  
    </View>
  );
};

export default Login;
