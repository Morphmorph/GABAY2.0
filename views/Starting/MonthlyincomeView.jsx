import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from '../Style';
import logo from '../../assets/logo/logo1.png'
import CustomInput from '../CustomInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMonthlyIncomeController } from '../../controller/MonthlyincomeController'; // Correct the import path
import LoadingScreen from '../LoadingScreen';
import ModalMessage from '../Modal';
import ModalMessageEE from '../ModalEE';
import Loader from './actionLoader';

const MonthlyIncome = () => {
  const { income, incomeError, setIncomeError, handleIncomeChange, startButtonPressed, showModalMessage, setShowModalMessage, showModalEEMessage, setShowModalEEMessage, loader, setLoader } = useMonthlyIncomeController();
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
            <Text style={Style.textcolor}>MONTHLY GROSS INCOME</Text>

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

            <TouchableOpacity style={Style.signInButton} onPress={startButtonPressed}>
              <Text style={Style.signInButtonText}>Start</Text>
            </TouchableOpacity>
            <ModalMessage showAutomatically={showModalMessage} message="Gross income successfully added!" icon={<MaterialCommunityIcons name="sack" size={200} color="#E3B448" />} navigateToScreen="Homescreen"/>
            <ModalMessageEE showAutomatically={showModalEEMessage} message="Check your internet connection!" icon={<MaterialCommunityIcons name="wifi-alert" size={200} color="#810000" />} navigateToScreen="Log in"/>
          </View>   
        </View>
      )}
      
    </>
  );
};

export default MonthlyIncome;
