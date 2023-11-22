import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useMonthlyIncomeController } from '../../controller/MonthlyincomeController'; // Correct the import path
import LoadingScreen from '../LoadingScreen';
import ModalMessage from '../Modal';

const MonthlyIncome = () => {
  const { income, incomeError, setIncomeError, handleIncomeChange, startButtonPressed, showModalMessage, setShowModalMessage } = useMonthlyIncomeController();
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
          <View style={Style.container}>
            <Text style={Style.textcolor}>TOTAL MONTHLY INCOME</Text>

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
            <ModalMessage showAutomatically={showModalMessage} message="Main income added successfully!"/>
          </View>   
        </View>
      )}
      
    </>
  );
};

export default MonthlyIncome;
