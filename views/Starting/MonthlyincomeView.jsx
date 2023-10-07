import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useMonthlyIncomeController } from '../../controller/MonthlyincomeController'; // Import the controller

const MonthlyIncome = () => {
  const { income, incomeError, setIncomeError, handleIncomeChange, startButtonPressed } = useMonthlyIncomeController();

  return (
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
      </View>
    </View>
  );
};

export default MonthlyIncome;
