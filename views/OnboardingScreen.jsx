import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';
import UserContext from '../api_server/context';


const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const {context} = useContext(UserContext)
  
  const handleDone = () => {
    navigation.navigate('Log in');
    setItem('onboarded', '1');
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ color: '#E3B448' }}>Get started</Text>
      </TouchableOpacity>
    );
  };


  return (
   
        <View style={styles.container}>
          <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            DoneButtonComponent={doneButton}
            containerStyles={{ paddingHorizontal: 15 }}
            pages={[
              {
                backgroundColor: '#3E6B35',
                image: (
                  <View style={styles.lottie}>
                    <LottieView
                      source={require('../assets/onboarding/savings.json')}
                      autoPlay
                      loop
                    />
                  </View>
                ),
                title: 'Forecast savings',
                subtitle: 'Project Your Savings by Analyzing Past Expenses',
              },
              {
                backgroundColor: '#E3B448',
                image: (
                  <View style={styles.lottie}>
                    <LottieView
                      source={require('../assets/onboarding/boost.json')}
                      autoPlay
                      loop
                    />
                  </View>
                ),
                title: 'Supercharge Your Efficiency',
                subtitle: 'Enhance Your Grasp of Monthly Expenditures',
              },
              {
                backgroundColor: '#CBD18F',
                image: (
                  <View style={styles.lottie}>
                    <LottieView
                      source={require('../assets/onboarding/work.json')}
                      autoPlay
                      loop
                    />
                  </View>
                ),
                title: 'Boost Savings Potential',
                subtitle: 'Maximize Savings with Smart Expense Insights',
              },
              {
                backgroundColor: '#3E6B35',
                image: (
                  <View style={styles.lottie}>
                    <LottieView
                      source={require('../assets/onboarding/achieve.json')}
                      autoPlay
                      loop
                    />
                  </View>
                ),
                title: 'Empower Financial Literacy',
                subtitle: 'Gain Insights into Expenses and future Savings',
              },
            ]}
          />
        </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
