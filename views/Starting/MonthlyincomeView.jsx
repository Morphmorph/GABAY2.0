import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Style from '../Style';
import logo from '../../assets/logo/logo1.png'
import Logo from '../../assets/logo/logo2.png';
import CustomInput from '../CustomInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMonthlyIncomeController } from '../../controller/MonthlyincomeController'; // Correct the import path
import LoadingScreen from '../LoadingScreen';
import ModalMessage from '../Modal';
import ModalMessageEE from '../ModalEE';
import Loader from './actionLoader';

const MonthlyIncome = () => {
  const { income, incomeError, setIncomeError, handleIncomeChange, savings, savingsError, setSavings, setSavingsError, handleSavingsChange, startButtonPressed, showModalMessage, setShowModalMessage, showModalEEMessage, setShowModalEEMessage, loader, setLoader } = useMonthlyIncomeController();
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to mimic component lifecycle behavior
  useEffect(() => {
    // Simulate loading completion
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change the time to your desired loading time
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={[Style.common, { justifyContent: 'center' }]}>
          <Loader visible={loader} message="Adding..." />
          <View style={Style.container}>
            <Text style={Style.textcolor}>MONTHLY NET INCOME</Text>

            <CustomInput
              iconName="currency-php"
              placeholder="Income"
              keyboardType="numeric"
              value={income}
              onChangeText={handleIncomeChange}
              error={incomeError}
              onFocus={() => {
                // Clear income error on focus
                setIncomeError(null);
              }}
            />
             <CustomInput
              iconName="piggy-bank-outline"
              placeholder="Savings"
              keyboardType="numeric"
              value={savings}
              onChangeText={handleSavingsChange}
              error={savingsError}
              onFocus={() => {
                // Clear income error on focus
                setSavingsError(null);
              }}
            />
            <TouchableOpacity style={Style.signInButton} onPress={startButtonPressed}>
              <Text style={Style.signInButtonText}>Start</Text>
            </TouchableOpacity>
            <ModalMessage showAutomatically={showModalMessage} message="WELCOME TO GABAY!" icon={<Image source={require('../../assets/logo/logo1.png')} style={{ width: 200, height: 200 }} resizeMode="contain"/>} navigateToScreen="Homescreen"/>  
            <ModalMessageEE showAutomatically={showModalEEMessage} message="Check your internet connection!" icon={<MaterialCommunityIcons name="wifi-alert" size={200} color="#810000" />} navigateToScreen="Log in"/>
          </View>   
        </View>
      )}
      
    </>
  );
};

export default MonthlyIncome;
