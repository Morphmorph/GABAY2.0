import React, { useState, useEffect } from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Forgot = () => {
  const { height } = useWindowDimensions();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Track password format validity
  const [isUppercase, setIsUppercase] = useState(false);
  const [isLowercase, setIsLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const navigation = useNavigation();

  const goToSignin = () => {
    navigation.navigate('Log in');
  };

  useEffect(() => {
    if (newPassword) {
      setIsPasswordValid(isValidPassword(newPassword));
      setIsUppercase(/[A-Z]/.test(newPassword));
      setIsLowercase(/[a-z]/.test(newPassword));
      setHasNumber(/[0-9]/.test(newPassword));
      setHasSymbol(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword));
    }
  }, [newPassword]);

  const handleSignUp = () => {
    // Clear existing errors
    setPasswordError(null);
    setConfirmNewPasswordError(null);

    // Validate password
    if (!newPassword) {
      setPasswordError('Password is required');
    } else if (newPassword.length < 8) { 
        setPasswordError('At least 8 characters');
    } else if (!isPasswordValid) {
      setPasswordError('Follow required format');
    } 

    // Validate confirm new password
    if (!confirmNewPassword) {
      setConfirmNewPasswordError('Required');
    } else if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('Passwords do not match');
    }

    // Check if all fields are valid
    if (isPasswordValid && newPassword.length >= 8 && confirmNewPassword && newPassword === confirmNewPassword) {
      // Clear the password error when all conditions are met
      setPasswordError(null);
      navigation.navigate('Log in');
    }
  };

  const isValidPassword = (password) => {
    // Password must have at least 8 characters and meet other requirements
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)
    );
  };

  return (
    <View style={Style.common}>
      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        <Text style={Style.textcolor}>FORGOT PASSWORD</Text>

        <CustomInput
          iconName="lock"
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
          error={passwordError}
          onFocus={() => {
            // Clear password error on focus
            setPasswordError(null);
          }}
        />

        {passwordError && (
          <View style={{ flexDirection: 'row', top: -12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isUppercase ? 'check' : 'times'}
                size={15}
                color={isUppercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714'}}>Uppercase</Text>
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
          value={confirmNewPassword}
          onChangeText={(text) => setConfirmNewPassword(text)}
          secureTextEntry
          error={confirmNewPasswordError}
          onFocus={() => {
            // Clear confirm new password error on focus
            setConfirmNewPasswordError(null);
          }}
        />

        <TouchableOpacity style={Style.signInButton} onPress={handleSignUp}>
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
    </View>
  );
};

export default Forgot;
