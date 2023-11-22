import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useForgotPasswordController } from '../../controller/ForgotpasswordController'; // Import the controller
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalMessage from '../Modal';

const ForgotPasswordView = ({navigation}) => {
  const handleTOS = () => {
    navigation.navigate('Terms of Service');
  };
  const handlePP = () => {
    navigation.navigate('Privacy Policy');
  };
  const { height } = useWindowDimensions();
  const {
    passwordData,
    errors,
    isUppercase,
    isLowercase,
    hasNumber,
    hasSymbol,
    setPasswordData,
    setErrors,
    goToSignin,
    handleUpdatePassword,
    showModalMessage,
    setShowModalMessage
  } = useForgotPasswordController();

  return (
    <View style={Style.common}>
      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        <Text style={Style.textcolor}>FORGOT PASSWORD</Text>

        <CustomInput
          iconName="lock"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
          secureTextEntry
          error={errors.newPassword}
          onFocus={() => {
            // Clear password error on focus
            setErrors({ ...errors, newPassword: null });
          }}
        />

        {errors.newPassword && (
          <View style={{ flexDirection: 'row', top: -12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isUppercase ? 'check' : 'times'}
                size={15}
                color={isUppercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Uppercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isLowercase ? 'check' : 'times'}
                size={15}
                color={isLowercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Lowercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={hasNumber ? 'check' : 'times'}
                size={15}
                color={hasNumber ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Number</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name={hasSymbol ? 'check' : 'times'}
                size={15}
                color={hasSymbol ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Symbol</Text>
            </View>
          </View>
        )}

        <CustomInput
          iconName="lock"
          placeholder="Confirm New Password"
          value={passwordData.confirmNewPassword}
          onChangeText={(text) => setPasswordData({ ...passwordData, confirmNewPassword: text })}
          secureTextEntry
          error={errors.confirmNewPassword}
          onFocus={() => {
            // Clear confirm new password error on focus
            setErrors({ ...errors, confirmNewPassword: null });
          }}
        />

        <TouchableOpacity style={Style.signInButton} onPress={handleUpdatePassword}>
          <Text style={Style.signInButtonText}>Update Password</Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginVertical: 20,
            color: '#144714',
          }}
        >
          <Text onPress={goToSignin} style={{ color: '#E3B448' }}>
            Cancel
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
      <ModalMessage showAutomatically={showModalMessage} message="Your password is updated!"/>
    </View>
  );
};

export default ForgotPasswordView;
