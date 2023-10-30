import React, { useState, useEffect } from 'react';
import { View, Text, Image, useWindowDimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo/logo1.png';
import Style from '../Style';

const Welcome = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  // Initialize animated values
  const logoPositionY = new Animated.Value(height / 5);
  const textOpacity = new Animated.Value(-7);

  useEffect(() => {
    // Define animation configurations
    const logoAnimation = Animated.timing(logoPositionY, {
      toValue: height * 0, // Desired top position
      duration: 1450, // Animation duration in milliseconds
      useNativeDriver: false, // Make sure to set this to false for layout animations
    });

    const textAnimation = Animated.timing(textOpacity, {
      toValue: 0.90, // Fully opaque
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: false, // Use native driver for opacity animation
    });

    // Start logo animation
    Animated.parallel([logoAnimation, textAnimation]).start(); // Start both animations in parallel
  }, []);

  const Signin = () => {
    navigation.navigate('Log in');
  };

  const Signup = () => {
    navigation.navigate('Sign up');
  };

  return (
    <View style={Style.common}>
      <Animated.Image
        source={Logo}
        style={[
          Style.logo,
          {
            height: height * 0.19,
            transform: [{ translateY: logoPositionY }], // Use translateY to animate vertical position
          },
        ]}
      />
      <Animated.Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          top: 10,
          color: '#144714',
          opacity: textOpacity, // Use the animated opacity value
        }}
      >
        <View>
        <Text style={[Style.textcolor, { fontSize: 50, fontWeight: 'bold' }]}>WELCOME{'\n'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text onPress={Signin} style={{ color: '#E3B448', fontSize: 25 }}>
            Login
          </Text>
         
          <Text onPress={Signup} style={{ color: '#E3B448', fontSize: 25 }}>
            Register
          </Text>
          </View>
        </View>
      </Animated.Text>
    </View>
  );
};

export default Welcome;
